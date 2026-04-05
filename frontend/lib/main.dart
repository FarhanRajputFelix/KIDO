import 'package:flutter/material.dart';
// import 'package:go_router/go_router.dart';

void main() {
  runApp(const KidoApp());
}

class KidoApp extends StatelessWidget {
  const KidoApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'KIDO Ecosystem',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.blueAccent),
        useMaterial3: true,
      ),
      home: const Scaffold(
        body: Center(
          child: Text('KIDO Mobile App Initialization...'),
        ),
      ),
    );
  }
}
