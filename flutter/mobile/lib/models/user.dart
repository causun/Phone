class User {
  final String email;
  final String fullName;
  final String? phone;
  final String? address;
  final String? gender;
  final String? avatar;
  final bool status;

  User({
    required this.email,
    required this.fullName,
    this.phone,
    this.address,
    this.gender,
    this.avatar,
    required this.status,
  });

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      email: json['email'],
      fullName: json['fullName'],
      phone: json['phone'],
      address: json['address'],
      gender: json['gender'],
      avatar: json['avatar'],
      status: json['status'] ?? true,
    );
  }
}
