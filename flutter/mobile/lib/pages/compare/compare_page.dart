import 'package:flutter/material.dart';
import '../../models/compare_result.dart';
import '../../services/compare_service.dart';

class ComparePage extends StatefulWidget {
  final int p1;
  final int p2;

  const ComparePage({super.key, required this.p1, required this.p2});

  @override
  State<ComparePage> createState() => _ComparePageState();
}

class _ComparePageState extends State<ComparePage> {
  late Future<CompareResult> future;

  @override
  void initState() {
    super.initState();
    future = CompareService.compare(widget.p1, widget.p2);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("So sánh sản phẩm")),
      body: FutureBuilder<CompareResult>(
        future: future,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          }

          if (!snapshot.hasData) {
            return const Center(child: Text("Không lấy được dữ liệu"));
          }

          final result = snapshot.data!;
          final p1 = result.p1;
          final p2 = result.p2;

          return SingleChildScrollView(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // ===== PRODUCTS =====
                Row(
                  children: [
                    _productCard(p1),
                    const SizedBox(width: 12),
                    _productCard(p2),
                  ],
                ),

                const SizedBox(height: 24),

                // ===== SPEC TABLE =====
                _specRow("Giá", "${p1.price} ₫", "${p2.price} ₫"),
                _specRow("RAM", p1.ram, p2.ram),
                _specRow("Bộ nhớ", p1.storage, p2.storage),
                _specRow("Chipset", p1.chipset, p2.chipset),
                _specRow("Camera", p1.camera, p2.camera),
                _specRow("Pin", p1.battery, p2.battery),
                _specRow("Màn hình", p1.screenSize, p2.screenSize),
                _specRow("Màu sắc", p1.color, p2.color),

                const SizedBox(height: 24),

                // ===== AI CONCLUSION =====
                Card(
                  color: Colors.blue.shade50,
                  child: Padding(
                    padding: const EdgeInsets.all(16),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text(
                          "🤖 Kết luận của AI",
                          style: TextStyle(
                            fontWeight: FontWeight.bold,
                            fontSize: 16,
                          ),
                        ),
                        const SizedBox(height: 8),
                        Text(result.aiConclusion),
                      ],
                    ),
                  ),
                ),

                const SizedBox(height: 20),

                Center(
                  child: ElevatedButton(
                    onPressed: () => Navigator.pop(context),
                    child: const Text("← Quay lại"),
                  ),
                ),
              ],
            ),
          );
        },
      ),
    );
  }

  // ================= COMPONENTS =================

  Widget _productCard(p) {
    return Expanded(
      child: Card(
        elevation: 4,
        child: Column(
          children: [
            Image.network(
              p.imageUrls.isNotEmpty ? p.imageUrls.first : "",
              height: 150,
              fit: BoxFit.cover,
              errorBuilder: (_, __, ___) => const Icon(Icons.image, size: 80),
            ),
            Padding(
              padding: const EdgeInsets.all(8),
              child: Column(
                children: [
                  Text(
                    p.name,
                    textAlign: TextAlign.center,
                    style: const TextStyle(fontWeight: FontWeight.bold),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    "${p.price} ₫",
                    style: const TextStyle(color: Colors.red),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _specRow(String label, String? v1, String? v2) {
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 8),
      decoration: const BoxDecoration(
        border: Border(bottom: BorderSide(color: Colors.grey)),
      ),
      child: Row(
        children: [
          Expanded(
            child: Text(
              label,
              style: const TextStyle(fontWeight: FontWeight.bold),
            ),
          ),
          Expanded(child: Text(v1 ?? "-")),
          Expanded(child: Text(v2 ?? "-")),
        ],
      ),
    );
  }
}
