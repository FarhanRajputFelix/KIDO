import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../core/theme.dart';
import '../../providers/auth_provider.dart';

class RegisterScreen extends StatefulWidget {
  const RegisterScreen({super.key});

  @override
  State<RegisterScreen> createState() => _RegisterScreenState();
}

class _RegisterScreenState extends State<RegisterScreen> {
  final _formKey = GlobalKey<FormState>();
  final _nameController = TextEditingController();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  String _selectedRole = 'parent';
  bool _obscurePassword = true;

  final List<Map<String, dynamic>> _roles = [
    {'value': 'parent', 'label': '👨‍👩‍👧 Parent / Guardian', 'desc': 'Manage and monitor your children'},
    {'value': 'teacher', 'label': '🏫 Teacher / Educator', 'desc': 'Upload lessons and track students'},
    {'value': 'child', 'label': '🎒 Child (Self)', 'desc': 'With parent invite code'},
  ];

  @override
  Widget build(BuildContext context) {
    final auth = context.watch<AuthProvider>();

    return Scaffold(
      appBar: AppBar(
        title: const Text('Create Account'),
        backgroundColor: KidoTheme.primary,
        foregroundColor: Colors.white,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(24),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                'Join KIDO! 🚀',
                style: TextStyle(fontSize: 26, fontWeight: FontWeight.w700, color: KidoTheme.textPrimary),
              ),
              const SizedBox(height: 6),
              const Text(
                'Select your role to get started',
                style: TextStyle(color: KidoTheme.textSecondary, fontSize: 14),
              ),
              const SizedBox(height: 24),

              // Role Selection
              ...(_roles.map((role) => GestureDetector(
                onTap: () => setState(() => _selectedRole = role['value']!),
                child: AnimatedContainer(
                  duration: const Duration(milliseconds: 200),
                  margin: const EdgeInsets.only(bottom: 12),
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: _selectedRole == role['value']
                        ? KidoTheme.primary.withOpacity(0.1)
                        : Colors.white,
                    borderRadius: BorderRadius.circular(16),
                    border: Border.all(
                      color: _selectedRole == role['value']
                          ? KidoTheme.primary
                          : Colors.grey.shade200,
                      width: 2,
                    ),
                  ),
                  child: Row(
                    children: [
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(role['label']!, style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 15)),
                            Text(role['desc']!, style: const TextStyle(color: KidoTheme.textSecondary, fontSize: 12)),
                          ],
                        ),
                      ),
                      if (_selectedRole == role['value'])
                        const Icon(Icons.check_circle, color: KidoTheme.primary),
                    ],
                  ),
                ),
              ))),

              const SizedBox(height: 20),
              TextFormField(
                controller: _nameController,
                decoration: const InputDecoration(labelText: 'Full Name', prefixIcon: Icon(Icons.person_outline)),
                validator: (v) => v!.isEmpty ? 'Required' : null,
              ),
              const SizedBox(height: 14),
              TextFormField(
                controller: _emailController,
                keyboardType: TextInputType.emailAddress,
                decoration: const InputDecoration(labelText: 'Email', prefixIcon: Icon(Icons.email_outlined)),
                validator: (v) => v!.isEmpty ? 'Required' : null,
              ),
              const SizedBox(height: 14),
              TextFormField(
                controller: _passwordController,
                obscureText: _obscurePassword,
                decoration: InputDecoration(
                  labelText: 'Password',
                  prefixIcon: const Icon(Icons.lock_outline),
                  suffixIcon: IconButton(
                    icon: Icon(_obscurePassword ? Icons.visibility_off : Icons.visibility),
                    onPressed: () => setState(() => _obscurePassword = !_obscurePassword),
                  ),
                ),
                validator: (v) => v!.length < 6 ? 'Min 6 characters' : null,
              ),

              if (auth.error != null) ...[
                const SizedBox(height: 12),
                Text(auth.error!, style: const TextStyle(color: KidoTheme.error)),
              ],

              const SizedBox(height: 28),
              SizedBox(
                width: double.infinity,
                child: ElevatedButton(
                  onPressed: auth.isLoading ? null : _register,
                  child: auth.isLoading
                      ? const SizedBox(height: 20, width: 20, child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2))
                      : const Text('Create Account'),
                ),
              ),
              const SizedBox(height: 16),
              Center(
                child: TextButton(
                  onPressed: () => Navigator.pop(context),
                  child: const Text('Already have an account? Sign In', style: TextStyle(color: KidoTheme.primary)),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Future<void> _register() async {
    if (!_formKey.currentState!.validate()) return;
    final auth = context.read<AuthProvider>();
    final success = await auth.register(
      _emailController.text.trim(),
      _passwordController.text,
      _nameController.text.trim(),
      _selectedRole,
    );
    if (success && mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('🎉 Account created! Please sign in.'), backgroundColor: KidoTheme.success),
      );
      Navigator.pop(context);
    }
  }

  @override
  void dispose() {
    _nameController.dispose();
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }
}
