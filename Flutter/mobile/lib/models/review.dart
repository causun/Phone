
  class Review {
  final int id;
  final int rating;
  final String? comment;
  final String userName;
  final String? adminReply;
  final DateTime createdAt;

  Review({
    required this.id,
    required this.rating,
    this.comment,
    required this.userName,
    this.adminReply,
    required this.createdAt,
  });

  factory Review.fromJson(Map<String, dynamic> json) {
    final dynamic rawCreatedAt = json['createdAt'];

    DateTime parsedCreatedAt;

    if (rawCreatedAt is List) {
      // Backend trả dạng [yyyy, MM, dd, HH, mm, ss, nano]
      parsedCreatedAt = DateTime(
        rawCreatedAt[0], // year
        rawCreatedAt[1], // month
        rawCreatedAt[2], // day
        rawCreatedAt.length > 3 ? rawCreatedAt[3] : 0,
        rawCreatedAt.length > 4 ? rawCreatedAt[4] : 0,
        rawCreatedAt.length > 5 ? rawCreatedAt[5] : 0,
      );
    } else if (rawCreatedAt is String) {
      // Trường hợp backend sau này đổi sang ISO string
      parsedCreatedAt = DateTime.parse(rawCreatedAt);
    } else {
      // fallback an toàn
      parsedCreatedAt = DateTime.now();
    }

    return Review(
      id: json['id'],
      rating: json['rating'],
      comment: json['comment'],
      userName: json['userName'] ?? "User",
      adminReply: json['adminReply'],
      createdAt: parsedCreatedAt,
    );
  }
}
