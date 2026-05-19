import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'core/theme.dart';
import 'providers/auth_provider.dart';
import 'providers/child_provider.dart';
import 'providers/content_provider.dart';
import 'providers/quiz_provider.dart';
import 'providers/chat_provider.dart';
import 'providers/teacher_provider.dart';
import 'screens/auth/login_screen.dart';
import 'screens/auth/register_screen.dart';
import 'screens/child/child_home_screen.dart';
import 'screens/parent/parent_dashboard_screen.dart';
import 'screens/teacher/teacher_home_screen.dart';

void main() {
  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => AuthProvider()),
        ChangeNotifierProvider(create: (_) => ChildProvider()),
        ChangeNotifierProvider(create: (_) => ContentProvider()),
        ChangeNotifierProvider(create: (_) => QuizProvider()),
        ChangeNotifierProvider(create: (_) => ChatProvider()),
        ChangeNotifierProvider(create: (_) => TeacherProvider()),
      ],
      child: const KidoApp(),
    ),
  );
}

class KidoApp extends StatelessWidget {
  const KidoApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'KIDO – Safe Learning for Kids',
      debugShowCheckedModeBanner: false,
      theme: KidoTheme.theme,
      home: const _SplashRouter(),
      routes: {
        '/login': (_) => const LoginScreen(),
        '/register': (_) => const RegisterScreen(),
        '/home/child': (_) => const ChildHomeScreen(),
        '/home/parent': (_) => const ParentDashboardScreen(),
        '/home/teacher': (_) => const TeacherHomeScreen(),
      },
    );
  }
}

class _SplashRouter extends StatefulWidget {
  const _SplashRouter();

  @override
  State<_SplashRouter> createState() => _SplashRouterState();
}

class _SplashRouterState extends State<_SplashRouter>
    with SingleTickerProviderStateMixin {
  late AnimationController _ctrl;
  late Animation<double> _scaleAnim;
  late Animation<double> _fadeAnim;

  @override
  void initState() {
    super.initState();
    _ctrl = AnimationController(
        vsync: this, duration: const Duration(milliseconds: 1200));
    _scaleAnim = CurvedAnimation(parent: _ctrl, curve: Curves.elasticOut);
    _fadeAnim = CurvedAnimation(parent: _ctrl, curve: Curves.easeIn);
    _ctrl.forward();
    _checkAuth();
  }

  Future<void> _checkAuth() async {
    await Future.delayed(const Duration(seconds: 2));
    if (!mounted) return;
    final auth = context.read<AuthProvider>();
    await auth.checkAuth();
    if (!mounted) return;
    if (auth.status == AuthStatus.authenticated) {
      if (auth.isChild) {
        Navigator.pushReplacementNamed(context, '/home/child');
      } else if (auth.isParent) {
        Navigator.pushReplacementNamed(context, '/home/parent');
      } else if (auth.isTeacher) {
        Navigator.pushReplacementNamed(context, '/home/teacher');
      } else {
        Navigator.pushReplacementNamed(context, '/login');
      }
    } else {
      Navigator.pushReplacementNamed(context, '/login');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: KidoTheme.gradientBackground,
        child: Center(
          child: FadeTransition(
            opacity: _fadeAnim,
            child: ScaleTransition(
              scale: _scaleAnim,
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Container(
                    width: 120,
                    height: 120,
                    decoration: BoxDecoration(
                      color: Colors.white.withOpacity(0.15),
                      borderRadius: BorderRadius.circular(36),
                    ),
                    child: const Center(
                      child: Text('🚀', style: TextStyle(fontSize: 64)),
                    ),
                  ),
                  const SizedBox(height: 24),
                  const Text(
                    'KIDO',
                    style: TextStyle(
                        fontSize: 48,
                        fontWeight: FontWeight.w800,
                        color: Colors.white,
                        letterSpacing: 6),
                  ),
                  const SizedBox(height: 8),
                  const Text(
                    'Safe. Smart. Fun.',
                    style: TextStyle(
                        color: Colors.white70, fontSize: 16, letterSpacing: 2),
                  ),
                  const SizedBox(height: 40),
                  const SizedBox(
                    width: 28,
                    height: 28,
                    child: CircularProgressIndicator(
                        color: Colors.white70, strokeWidth: 2),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  @override
  void dispose() {
    _ctrl.dispose();
    super.dispose();
  }
}
