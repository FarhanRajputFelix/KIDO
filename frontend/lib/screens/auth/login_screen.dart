import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../core/theme.dart';
import '../../providers/auth_provider.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _formKey = GlobalKey<FormState>();
  final _emailCtrl = TextEditingController();
  final _passCtrl = TextEditingController();
  bool _obscure = true;

  @override
  void dispose() {
    _emailCtrl.dispose();
    _passCtrl.dispose();
    super.dispose();
  }

  Future<void> _login() async {
    if (!_formKey.currentState!.validate()) return;
    final auth = context.read<AuthProvider>();
    final ok = await auth.login(_emailCtrl.text.trim(), _passCtrl.text);
    if (!mounted) return;
    if (ok) {
      _navigateByRole(auth);
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text(auth.error ?? 'Login failed'), backgroundColor: KidoTheme.error),
      );
    }
  }

  void _navigateByRole(AuthProvider auth) {
    if (auth.isChild) {
      Navigator.pushReplacementNamed(context, '/home/child');
    } else if (auth.isParent) {
      Navigator.pushReplacementNamed(context, '/home/parent');
    } else if (auth.isTeacher) {
      Navigator.pushReplacementNamed(context, '/home/teacher');
    } else {
      Navigator.pushReplacementNamed(context, '/home/parent');
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
                Container(
                  width: 90, height: 90,
                  decoration: BoxDecoration(
                    color: Colors.white.withOpacity(0.2),
                    borderRadius: BorderRadius.circular(28),
                  ),
                  child: const Center(child: Text('🚀', style: TextStyle(fontSize: 48))),
                ),
                const SizedBox(height: 16),
                const Text('KIDO', style: TextStyle(fontSize: 40, fontWeight: FontWeight.w800, color: Colors.white, letterSpacing: 4)),
                const Text('Safe. Smart. Fun.', style: TextStyle(color: Colors.white70, fontSize: 14)),
                const SizedBox(height: 40),
                Container(
                  padding: const EdgeInsets.all(28),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(28),
                  ),
                  child: Form(
                    key: _formKey,
                    child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                      const Text('Welcome back!', style: TextStyle(fontSize: 22, fontWeight: FontWeight.w700, color: KidoTheme.textPrimary)),
                      const SizedBox(height: 4),
                      const Text('Sign in to continue', style: TextStyle(color: KidoTheme.textSecondary, fontSize: 13)),
                      const SizedBox(height: 24),
                      TextFormField(
                        controller: _emailCtrl,
                        keyboardType: TextInputType.emailAddress,
                        decoration: const InputDecoration(labelText: 'Email', prefixIcon: Icon(Icons.email_outlined)),
                        validator: (v) => v == null || !v.contains('@') ? 'Enter valid email' : null,
                      ),
                      const SizedBox(height: 16),
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
                      const SizedBox(height: 24),
                      SizedBox(
                        width: double.infinity,
                        child: ElevatedButton(
                          onPressed: auth.isLoading ? null : _login,
                          child: auth.isLoading
                              ? const SizedBox(width: 20, height: 20, child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2))
                              : const Text('Sign In'),
                        ),
                      ),
                      const SizedBox(height: 12),
                      Center(
                        child: TextButton(
                          onPressed: () => Navigator.pushNamed(context, '/register'),
                          child: const Text("New here? Register", style: TextStyle(color: KidoTheme.primary)),
                        ),
                      ),
                      const Divider(height: 28),
                      const Text('Quick demo:', style: TextStyle(fontSize: 11, color: KidoTheme.textSecondary)),
                      const SizedBox(height: 6),
                      Wrap(spacing: 6, runSpacing: 4, children: [
                        _demoChip('Parent', 'parent@kido.com'),
                        _demoChip('Teacher', 'teacher@kido.com'),
                        _demoChip('Kid', 'aiza@kido.com'),
                      ]),
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

  Widget _demoChip(String label, String email) => ActionChip(
    label: Text(label, style: const TextStyle(fontSize: 11)),
    onPressed: () { _emailCtrl.text = email; _passCtrl.text = 'password123'; },
    backgroundColor: KidoTheme.primary.withOpacity(0.1),
    labelStyle: const TextStyle(color: KidoTheme.primary),
  );
}
