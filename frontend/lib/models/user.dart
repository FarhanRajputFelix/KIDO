class KidoUser {
  final String id;
  final String email;
  final String name;
  final String role;
  final String? avatar;

  const KidoUser({
    required this.id,
    required this.email,
    required this.name,
    required this.role,
    this.avatar,
  });

  factory KidoUser.fromJson(Map<String, dynamic> j) => KidoUser(
        id: j['id'] as String,
        email: j['email'] as String,
        name: j['name'] as String,
        role: j['role'] as String,
        avatar: j['avatar'] as String?,
      );

  bool get isParent => role == 'parent';
  bool get isTeacher => role == 'teacher';
  bool get isChild => role == 'child';
  bool get isAdmin => role == 'admin';
}
