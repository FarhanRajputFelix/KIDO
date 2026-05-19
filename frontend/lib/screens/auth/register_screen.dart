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
  final _nameCtrl = TextEditingController();
  final _emailCtrl = TextEditingController();
  final _passCtrl = TextEditingController();
  String _role = 'parent';
  bool _obscure = true;

  @override
  void dispose() {
    _nameCtrl.dispose(); _emailCtrl.dispose(); _passCtrl.dispose();
    super.dispose();
  }

  Future<void> _register() async {
    if (!_formKey.currentState!.validate()) return;
    final auth = context.read<AuthProvider>();
    final ok = await auth.register(_emailCtrl.text.trim(), _passCtrl.text, _nameCtrl.text.trim(), _role);
    if (!mounted) return;
    if (ok) {
      if (auth.isTeacher) Navigator.pushReplacementNamed(context, '/home/teacher');
      else Navigator.pushReplacementNamed(context, '/home/parent');
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text(auth.error ?? 'Registration failed'), backgroundColor: KidoTheme.error),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    final auth = context.watch<AuthProvider>();
    return Scaffold(
      body: Container(
        decoration: KidoTheme.gradientBackground,
        child: SafeArea(
          child: Center(
            child: SingleChildScrollView(
              padding: const EdgeInsets.all(24),
              child: Column(children: [
                Row(children: [
                  IconButton(onPressed: () => Navigator.pop(context), icon: const Icon(Icons.arrow_back, color: Colors.white)),
                  const Text('Create Account', style: TextStyle(color: Colors.white, fontSize: 20, fontWeight: FontWeight.w700)),
                ]),
                const SizedBox(height: 24),
                Container(
                  padding: const EdgeInsets.all(28),
                  decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(28)),
                  child: Form(
                    key: _formKey,
                    child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                      TextFormField(
                        controller: _nameCtrl,
                        decoration: const InputDecoration(labelText: 'Full Name', prefixIcon: Icon(Icons.person_outline)),
                        validator: (v) => v == null || v.trim().isEmpty ? 'Name required' : null,
                      ),
                      const SizedBox(height: 14),
                      TextFormField(
                        controller: _emailCtrl,
                        keyboardType: TextInputType.emailAddress,
                        decoration: const InputDecoration(labelText: 'Email', prefixIcon: Icon(Icons.email_outlined)),
                        validator: (v) => v == null || !v.contains('@') ? 'Enter valid email' : null,
                      ),
                      const SizedBox(height: 14),
                      TextFormField(
                        controller: _passCtrl,
                        obscureText: _obscure,
                        decoration: InputDecoration(
                          labelText: 'Password',
                          prefixIcon: const Icon(Icons.lock_outline),
                          suffixIcon: IconButton(
                            icon: Icon(_obscure ? Icons.visibility_off : Icons.visibility),
                            onPressed: () => setState(() => _obscure = !_obscure),
                          ),
                        ),
                        validator: (v) => v == null || v.length < 6 ? 'Min 6 characters' : null,
                      ),
                      const SizedBox(height: 20),
                      const Text('I am a:', style: TextStyle(fontWeight: FontWeight.w600, color: KidoTheme.textPrimary)),
                      const SizedBox(height: 10),
                      Row(children: [
                        _roleCard('parent', '👨‍👩‍👧', 'Parent'),
                        const SizedBox(width: 12),
                        _roleCard('teacher', '👩‍🏫', 'Teacher'),
                      ]),
                      const SizedBox(height: 24),
                      SizedBox(
                        width: double.infinity,
                        child: ElevatedButton(
                          onPressed: auth.isLoading ? null : _register,
                          child: auth.isLoading
                              ? const SizedBox(width: 20, height: 20, child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2))
                              : const Text('Create Account'),
                        ),
                      ),
                      const SizedBox(height: 12),
                      Center(
                        child: TextButton(
                          onPressed: () => Navigator.pop(context),
                          child: const Text('Already have an account? Sign in', style: TextStyle(color: KidoTheme.primary)),
                        ),
                      ),
                    ]),
                  ),
                ),
              ]),
            ),
          ),
        ),
      ),
    );
  }

  Widget _roleCard(String role, String emoji, String label) => Expanded(
    child: GestureDetector(
      onTap: () => setState(() => _role = role),
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 200),
        padding: const EdgeInsets.symmetric(vertical: 16),
        decoration: BoxDecoration(
          color: _role == role ? KidoTheme.primary : KidoTheme.background,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: _role == role ? KidoTheme.primary : Colors.grey.shade200, width: 2),
        ),
        child: Column(children: [
          Text(emoji, style: const TextStyle(fontSize: 28)),
          const SizedBox(height: 4),
          Text(label, style: TextStyle(color: _role == role ? Colors.white : KidoTheme.textPrimary, fontWeight: FontWeight.w600)),
        ]),
      ),
    ),
  );
}
