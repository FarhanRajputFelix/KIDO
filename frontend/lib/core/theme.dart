import 'package:flutter/material.dart';

class KidoTheme {
  static const Color primary = Color(0xFF6C63FF);       // Vibrant purple
  static const Color primaryDark = Color(0xFF4B44D6);
  static const Color secondary = Color(0xFFFF6B6B);     // Energetic coral
  static const Color accent = Color(0xFF4ECDC4);        // Teal
  static const Color gold = Color(0xFFFFD700);          // XP gold
  static const Color background = Color(0xFFF8F9FE);
  static const Color surface = Color(0xFFFFFFFF);
  static const Color cardBg = Color(0xFFFFFFFF);
  static const Color textPrimary = Color(0xFF2D2D3F);
  static const Color textSecondary = Color(0xFF6B6B8D);
  static const Color success = Color(0xFF4CAF50);
  static const Color warning = Color(0xFFFF9800);
  static const Color error = Color(0xFFF44336);
  static const Color streak = Color(0xFFFF6B35);        // Streak orange

  // Category Colors
  static const Color mathColor = Color(0xFF6C63FF);
  static const Color scienceColor = Color(0xFF4ECDC4);
  static const Color creativityColor = Color(0xFFFF6B6B);
  static const Color ethicsColor = Color(0xFF45B7D1);

  static ThemeData get theme {
    return ThemeData(
      useMaterial3: true,
      fontFamily: 'Poppins',
      colorScheme: ColorScheme.fromSeed(
        seedColor: primary,
        primary: primary,
        secondary: secondary,
        surface: surface,
        background: background,
        brightness: Brightness.light,
      ),
      appBarTheme: const AppBarTheme(
        backgroundColor: Colors.transparent,
        elevation: 0,
        centerTitle: true,
        titleTextStyle: TextStyle(
          fontFamily: 'Poppins',
          fontSize: 18,
          fontWeight: FontWeight.w600,
          color: textPrimary,
        ),
        iconTheme: IconThemeData(color: textPrimary),
      ),
      cardTheme: CardTheme(
        elevation: 0,
        color: cardBg,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(20),
        ),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: primary,
          foregroundColor: Colors.white,
          elevation: 0,
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 14),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(14),
          ),
          textStyle: const TextStyle(
            fontFamily: 'Poppins',
            fontSize: 15,
            fontWeight: FontWeight.w600,
          ),
        ),
      ),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: const Color(0xFFF0F0FF),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(14),
          borderSide: BorderSide.none,
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(14),
          borderSide: const BorderSide(color: primary, width: 2),
        ),
        contentPadding: const EdgeInsets.symmetric(horizontal: 18, vertical: 16),
      ),
      scaffoldBackgroundColor: background,
    );
  }

  static BoxDecoration get gradientBackground => const BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [Color(0xFF6C63FF), Color(0xFF3F3D9E)],
        ),
      );

  static BoxDecoration cardDecoration({Color? color}) => BoxDecoration(
        color: color ?? cardBg,
        borderRadius: BorderRadius.circular(20),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.06),
            blurRadius: 20,
            offset: const Offset(0, 4),
          ),
        ],
      );
}
