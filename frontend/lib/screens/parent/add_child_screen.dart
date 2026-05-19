import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../core/theme.dart';
import '../../providers/child_provider.dart';

class AddChildScreen extends StatefulWidget {
  const AddChildScreen({super.key});
  @override
  State<AddChildScreen> createState() => _AddChildScreenState();
}

class _AddChildScreenState extends State<AddChildScreen> {
  final _formKey = GlobalKey<FormState>();
  final _nameCtrl = TextEditingController();
  final _gradeCtrl = TextEditingController();
  int _age = 8;
  bool _loading = false;

  @override
  void dispose() {
    _nameCtrl.dispose();
    _gradeCtrl.dispose();
    super.dispose();
  }

  Future<void> _save() async {
    if (!_formKey.currentState!.validate()) return;
    setState(() => _loading = true);
    final ok = await context.read<ChildProvider>().createChild(
      name: _nameCtrl.text.trim(),
      age: _age,
      grade: _gradeCtrl.text.trim().isEmpty ? null : _gradeCtrl.text.trim(),
    );
    if (!mounted) return;
    if (ok) {
      Navigator.pop(context, true);
    } else {
      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Failed to add child'), backgroundColor: KidoTheme.error));
      setState(() => _loading = false);
    }
  }

  @override
  Widget build(BuildContext context) => Scaffold(
    appBar: AppBar(title: const Text('Add Child')),
    body: Form(
      key: _formKey,
      child: ListView(padding: const EdgeInsets.all(20), children: [
        const Center(child: Text('👶', style: TextStyle(fontSize: 64))),
        const SizedBox(height: 24),
        TextFormField(
          controller: _nameCtrl,
          decoration: const InputDecoration(labelText: 'Child Name', prefixIcon: Icon(Icons.child_care)),
          validator: (v) => v == null || v.trim().isEmpty ? 'Name required' : null,
        ),
        const SizedBox(height: 16),
        const Text('Age', style: TextStyle(fontWeight: FontWeight.w600, color: KidoTheme.textPrimary)),
        const SizedBox(height: 8),
        Row(children: [
          Text('$_age years old', style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w700, color: KidoTheme.primary)),
          const Spacer(),
          IconButton(icon: const Icon(Icons.remove_circle_outline), onPressed: _age > 4 ? () => setState(() => _age--) : null),
          IconButton(icon: const Icon(Icons.add_circle_outline, color: KidoTheme.primary), onPressed: _age < 18 ? () => setState(() => _age++) : null),
        ]),
        Slider(value: _age.toDouble(), min: 4, max: 18, divisions: 14, label: '$_age',
          onChanged: (v) => setState(() => _age = v.round())),
        const SizedBox(height: 16),
        TextFormField(
          controller: _gradeCtrl,
          decoration: const InputDecoration(labelText: 'Grade (optional)', prefixIcon: Icon(Icons.school_outlined), hintText: 'e.g. Grade 3, Class 5'),
        ),
        const SizedBox(height: 40),
        ElevatedButton(
          onPressed: _loading ? null : _save,
          child: _loading
              ? const SizedBox(width: 20, height: 20, child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2))
              : const Text('Add Child'),
        ),
      ]),
    ),
  );
}
