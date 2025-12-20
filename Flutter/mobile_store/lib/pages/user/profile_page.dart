import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:dio/dio.dart';
import 'dart:io';

class ProfilePage extends StatefulWidget {
  const ProfilePage({super.key});

  @override
  State<ProfilePage> createState() => _ProfilePageState();
}

class _ProfilePageState extends State<ProfilePage> {
  // Controllers cho Form
  final _nameController = TextEditingController();
  final _phoneController = TextEditingController();
  final _birthdayController = TextEditingController();
  final _detailAddressController = TextEditingController();
  final _emailController = TextEditingController(); // Readonly

  File? _avatarFile;
  String? currentAvatarUrl;
  bool _isLoading = false;

  // State cho địa chỉ (Giả lập logic giống sub-vn trên web)
  String? selectedProvince;
  String? selectedDistrict;
  String? selectedWard;

  @override
  void initState() {
    super.initState();
    _loadUserData();
  }

  void _loadUserData() {
    // Giả lập dữ liệu từ LocalStorage/Backend
    setState(() {
      _nameController.text = "Nguyễn Văn A";
      _phoneController.text = "0987654321";
      _emailController.text = "user@example.com";
      _birthdayController.text = "1995-01-01";
      currentAvatarUrl = "http://192.168.43.175:8081/uploads/avatars/default.png"; // Lưu ý: 10.0.2.2 cho Emulator
      
      // Logic tách địa chỉ tương tự Web
      selectedProvince = "Hà Nội";
      selectedDistrict = "Quận Cầu Giấy";
      selectedWard = "Phường Dịch Vọng";
      _detailAddressController.text = "Số 1 Duy Tân";
    });
  }

  Future<void> _pickImage() async {
    final picker = ImagePicker();
    final pickedFile = await picker.pickImage(source: ImageSource.gallery);
    if (pickedFile != null) {
      setState(() => _avatarFile = File(pickedFile.path));
    }
  }

  Future<void> _handleSave() async {
    setState(() => _isLoading = true);

    try {
      final dio = Dio();
      String fullAddress = "${_detailAddressController.text}, $selectedWard, $selectedDistrict, $selectedProvince";

      // Tạo FormData tương đương bản Web
      FormData formData = FormData.fromMap({
        "name": _nameController.text,
        "phone": _phoneController.text,
        "birthday": _birthdayController.text,
        "address": fullAddress,
        if (_avatarFile != null)
          "avatar": await MultipartFile.fromFile(
            _avatarFile!.path,
            filename: _avatarFile!.path.split('/').last,
          ),
      });

      // Thay đổi URL theo backend của bạn
      final response = await dio.put(
        "http://192.168.43.175:8081/auth/user/1/update", 
        data: formData,
      );

      if (response.statusCode == 200) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text("Cập nhật thông tin thành công!")),
        );
        Navigator.pop(context);
      }
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text("Lỗi: $e")),
      );
    } finally {
      setState(() => _isLoading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF8F9FA),
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: Colors.black),
          onPressed: () => Navigator.pop(context),
        ),
        title: const Text("Thông tin cá nhân", style: TextStyle(color: Colors.black, fontWeight: FontWeight.bold)),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Container(
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(20),
            boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.05), blurRadius: 15)],
          ),
          padding: const EdgeInsets.all(20),
          child: Column(
            children: [
              // AVATAR SECTION
              _buildAvatarSection(),
              const SizedBox(height: 30),

              // FORM FIELDS
              Row(
                children: [
                  Expanded(child: _buildTextField("Họ tên", _nameController)),
                  const SizedBox(width: 15),
                  Expanded(child: _buildTextField("Số điện thoại", _phoneController, keyboardType: TextInputType.phone)),
                ],
              ),
              _buildTextField("Email", _emailController, readOnly: true),
              _buildTextField("Ngày sinh", _birthdayController, hint: "YYYY-MM-DD", icon: Icons.calendar_today),

              const Divider(height: 40),
              
              // ADDRESS SECTION
              const Align(
                alignment: Alignment.centerLeft,
                child: Text("Địa chỉ", style: TextStyle(fontWeight: FontWeight.w600, fontSize: 14)),
              ),
              const SizedBox(height: 10),
              
              _buildDropdown("Chọn Tỉnh/Thành", selectedProvince, ["Hà Nội", "Hồ Chí Minh"], (val) => setState(() => selectedProvince = val)),
              const SizedBox(height: 12),
              
              Row(
                children: [
                  Expanded(child: _buildDropdown("Quận/Huyện", selectedDistrict, ["Quận Cầu Giấy", "Quận Ba Đình"], (val) => setState(() => selectedDistrict = val))),
                  const SizedBox(width: 12),
                  Expanded(child: _buildDropdown("Phường/Xã", selectedWard, ["Phường Dịch Vọng", "Phường Nghĩa Tân"], (val) => setState(() => selectedWard = val))),
                ],
              ),
              const SizedBox(height: 12),
              _buildTextField("", _detailAddressController, hint: "Số nhà, tên đường..."),

              const SizedBox(height: 30),

              // SAVE BUTTON
              SizedBox(
                width: double.infinity,
                height: 50,
                child: ElevatedButton(
                  onPressed: _isLoading ? null : _handleSave,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFF0A84FF),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                  ),
                  child: _isLoading 
                    ? const CircularProgressIndicator(color: Colors.white)
                    : const Text("CẬP NHẬT TÀI KHOẢN", style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
                ),
              )
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildAvatarSection() {
    return Column(
      children: [
        Stack(
          alignment: Alignment.bottomRight,
          children: [
            Container(
              padding: const EdgeInsets.all(4),
              decoration: const BoxDecoration(color: Colors.white, shape: BoxShape.circle),
              child: CircleAvatar(
                radius: 55,
                backgroundColor: Colors.grey[200],
                backgroundImage: _avatarFile != null 
                  ? FileImage(_avatarFile!) 
                  : NetworkImage(currentAvatarUrl!) as ImageProvider,
              ),
            ),
          ],
        ),
        TextButton(
          onPressed: _pickImage,
          child: const Text("Thay đổi ảnh đại diện", style: TextStyle(color: Color(0xFF0A84FF), fontWeight: FontWeight.w500)),
        )
      ],
    );
  }

  Widget _buildTextField(String label, TextEditingController controller, {bool readOnly = false, TextInputType? keyboardType, String? hint, IconData? icon}) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 15),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          if (label.isNotEmpty) Text(label, style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 14, color: Color(0xFF444444))),
          if (label.isNotEmpty) const SizedBox(height: 6),
          TextField(
            controller: controller,
            readOnly: readOnly,
            keyboardType: keyboardType,
            style: TextStyle(color: readOnly ? Colors.grey : Colors.black),
            decoration: InputDecoration(
              hintText: hint,
              suffixIcon: icon != null ? Icon(icon, size: 20) : null,
              filled: readOnly,
              fillColor: readOnly ? const Color(0xFFF8F9FA) : Colors.transparent,
              contentPadding: const EdgeInsets.symmetric(horizontal: 15, vertical: 12),
              border: OutlineInputBorder(borderRadius: BorderRadius.circular(8), borderSide: const BorderSide(color: Color(0xFFE0E0E0))),
              enabledBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(8), borderSide: const BorderSide(color: Color(0xFFE0E0E0))),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildDropdown(String hint, String? value, List<String> items, Function(String?) onChanged) {
    return DropdownButtonFormField<String>(
      value: value,
      decoration: InputDecoration(
        contentPadding: const EdgeInsets.symmetric(horizontal: 15),
        border: OutlineInputBorder(borderRadius: BorderRadius.circular(8), borderSide: const BorderSide(color: Color(0xFFE0E0E0))),
        enabledBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(8), borderSide: const BorderSide(color: Color(0xFFE0E0E0))),
      ),
      hint: Text(hint),
      items: items.map((i) => DropdownMenuItem(value: i, child: Text(i))).toList(),
      onChanged: onChanged,
    );
  }
}