import 'package:flutter/material.dart';
import '../../core/theme.dart';
import '../../core/api_client.dart';

class QuizScreen extends StatefulWidget {
  final String? category;
  const QuizScreen({super.key, this.category});

  @override
  State<QuizScreen> createState() => _QuizScreenState();
}

class _QuizScreenState extends State<QuizScreen> with SingleTickerProviderStateMixin {
  bool _isLoading = true;
  Map<String, dynamic>? _sessionData;
  List<dynamic> _questions = [];
  int _currentIndex = 0;
  String? _selectedAnswer;
  bool _showResult = false;
  int _correct = 0;
  int _sessionId = 0;
  late AnimationController _animController;
  late Animation<double> _fadeAnim;

  @override
  void initState() {
    super.initState();
    _animController = AnimationController(vsync: this, duration: const Duration(milliseconds: 400));
    _fadeAnim = CurvedAnimation(parent: _animController, curve: Curves.easeIn);
    _startQuiz();
  }

  Future<void> _startQuiz() async {
    try {
      final data = await ApiClient().startQuiz(category: widget.category);
      setState(() {
        _sessionData = data;
        _questions = data['questions'] as List<dynamic>;
        _sessionId = data['session_id'];
        _isLoading = false;
      });
      _animController.forward();
    } catch (e) {
      setState(() => _isLoading = false);
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Could not load quiz. Is the server running?'), backgroundColor: KidoTheme.error),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          widget.category != null
              ? '${widget.category!.substring(0, 1).toUpperCase()}${widget.category!.substring(1)} Quiz'
              : 'Adaptive Quiz 🧠',
        ),
        backgroundColor: KidoTheme.primary,
        foregroundColor: Colors.white,
        elevation: 0,
      ),
      body: _isLoading
          ? const Center(child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                CircularProgressIndicator(),
                SizedBox(height: 16),
                Text('Loading your quiz...', style: TextStyle(color: KidoTheme.textSecondary)),
              ],
            ))
          : _questions.isEmpty
              ? Center(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      const Text('📭', style: TextStyle(fontSize: 60)),
                      const SizedBox(height: 12),
                      const Text('No questions available yet', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600)),
                      const SizedBox(height: 8),
                      const Text('Questions will be added soon!', style: TextStyle(color: KidoTheme.textSecondary)),
                      const SizedBox(height: 20),
                      ElevatedButton(onPressed: () => Navigator.pop(context), child: const Text('Go Back')),
                    ],
                  ),
                )
              : _showResult
                  ? _buildResults()
                  : FadeTransition(opacity: _fadeAnim, child: _buildQuestion()),
    );
  }

  Widget _buildQuestion() {
    if (_currentIndex >= _questions.length) {
      WidgetsBinding.instance.addPostFrameCallback((_) => setState(() => _showResult = true));
      return const SizedBox();
    }

    final q = _questions[_currentIndex] as Map<String, dynamic>;
    final options = <MapEntry<String, String>>[];
    if (q['option_a'] != null) options.add(MapEntry('a', q['option_a']));
    if (q['option_b'] != null) options.add(MapEntry('b', q['option_b']));
    if (q['option_c'] != null) options.add(MapEntry('c', q['option_c']));
    if (q['option_d'] != null) options.add(MapEntry('d', q['option_d']));

    return SingleChildScrollView(
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Progress
          Row(
            children: [
              Text('${_currentIndex + 1}/${_questions.length}', style: const TextStyle(fontWeight: FontWeight.w600, color: KidoTheme.primary)),
              const SizedBox(width: 12),
              Expanded(
                child: LinearProgressIndicator(
                  value: (_currentIndex + 1) / _questions.length,
                  backgroundColor: Colors.grey.shade200,
                  valueColor: const AlwaysStoppedAnimation<Color>(KidoTheme.primary),
                  minHeight: 8,
                  borderRadius: BorderRadius.circular(4),
                ),
              ),
              const SizedBox(width: 12),
              const Icon(Icons.star, color: KidoTheme.gold, size: 18),
              Text(' ${_correct * 10} XP', style: const TextStyle(fontWeight: FontWeight.w700, color: KidoTheme.gold, fontSize: 13)),
            ],
          ),

          const SizedBox(height: 28),

          // Question
          Container(
            width: double.infinity,
            padding: const EdgeInsets.all(24),
            decoration: BoxDecoration(
              gradient: const LinearGradient(
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
                colors: [KidoTheme.primary, KidoTheme.primaryDark],
              ),
              borderRadius: BorderRadius.circular(24),
            ),
            child: Column(
              children: [
                const Text('❓', style: TextStyle(fontSize: 36)),
                const SizedBox(height: 12),
                Text(
                  q['question'] ?? '',
                  textAlign: TextAlign.center,
                  style: const TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.w600, height: 1.4),
                ),
              ],
            ),
          ),

          const SizedBox(height: 24),
          const Text('Choose your answer:', style: TextStyle(fontWeight: FontWeight.w600, color: KidoTheme.textSecondary, fontSize: 13)),
          const SizedBox(height: 12),

          // Options
          ...options.map((entry) {
            final isSelected = _selectedAnswer == entry.key;
            final isCorrect = q['correct_answer'] == entry.key;

            Color bgColor = Colors.white;
            Color borderColor = Colors.grey.shade200;
            Color textColor = KidoTheme.textPrimary;

            if (_selectedAnswer != null) {
              if (isCorrect) { bgColor = KidoTheme.success.withOpacity(0.1); borderColor = KidoTheme.success; textColor = KidoTheme.success; }
              else if (isSelected) { bgColor = KidoTheme.error.withOpacity(0.1); borderColor = KidoTheme.error; textColor = KidoTheme.error; }
            } else if (isSelected) {
              bgColor = KidoTheme.primary.withOpacity(0.1);
              borderColor = KidoTheme.primary;
              textColor = KidoTheme.primary;
            }

            return GestureDetector(
              onTap: _selectedAnswer != null ? null : () => _selectAnswer(entry.key, q['correct_answer'] ?? ''),
              child: AnimatedContainer(
                duration: const Duration(milliseconds: 200),
                margin: const EdgeInsets.only(bottom: 10),
                padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 16),
                decoration: BoxDecoration(
                  color: bgColor,
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: borderColor, width: 2),
                ),
                child: Row(
                  children: [
                    Container(
                      width: 28, height: 28,
                      decoration: BoxDecoration(color: borderColor.withOpacity(0.15), shape: BoxShape.circle),
                      child: Center(
                        child: Text(entry.key.toUpperCase(), style: TextStyle(fontWeight: FontWeight.w700, color: borderColor, fontSize: 13)),
                      ),
                    ),
                    const SizedBox(width: 14),
                    Expanded(child: Text(entry.value, style: TextStyle(color: textColor, fontWeight: FontWeight.w500, fontSize: 14))),
                    if (_selectedAnswer != null && isCorrect) const Icon(Icons.check_circle, color: KidoTheme.success),
                    if (_selectedAnswer != null && isSelected && !isCorrect) const Icon(Icons.cancel, color: KidoTheme.error),
                  ],
                ),
              ),
            );
          }),

          if (_selectedAnswer != null) ...[
            const SizedBox(height: 16),
            if (q['explanation'] != null && q['explanation'].toString().isNotEmpty)
              Container(
                padding: const EdgeInsets.all(14),
                decoration: BoxDecoration(color: KidoTheme.accent.withOpacity(0.1), borderRadius: BorderRadius.circular(14), border: Border.all(color: KidoTheme.accent.withOpacity(0.3))),
                child: Row(
                  children: [
                    const Icon(Icons.lightbulb, color: KidoTheme.accent, size: 20),
                    const SizedBox(width: 8),
                    Expanded(child: Text(q['explanation'] ?? '', style: const TextStyle(color: KidoTheme.textPrimary, fontSize: 13))),
                  ],
                ),
              ),
            const SizedBox(height: 16),
            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                onPressed: _nextQuestion,
                child: Text(_currentIndex < _questions.length - 1 ? 'Next Question →' : 'See Results 🏆'),
              ),
            ),
          ],
        ],
      ),
    );
  }

  void _selectAnswer(String answer, String correct) {
    setState(() {
      _selectedAnswer = answer;
      if (answer == correct) _correct++;
    });
  }

  void _nextQuestion() {
    setState(() {
      _selectedAnswer = null;
      if (_currentIndex < _questions.length - 1) {
        _currentIndex++;
        _animController.reset();
        _animController.forward();
      } else {
        _showResult = true;
      }
    });
  }

  Widget _buildResults() {
    final total = _questions.length;
    final pct = total > 0 ? (_correct / total * 100).round() : 0;
    final xpEarned = _correct * 10;
    String emoji = pct >= 80 ? '🏆' : pct >= 60 ? '⭐' : '💪';
    String message = pct >= 80 ? 'Excellent work!' : pct >= 60 ? 'Good job!' : 'Keep practicing!';

    return Center(
      child: SingleChildScrollView(
        padding: const EdgeInsets.all(28),
        child: Column(
          children: [
            Text(emoji, style: const TextStyle(fontSize: 80)),
            const SizedBox(height: 16),
            Text(message, style: const TextStyle(fontSize: 28, fontWeight: FontWeight.w700, color: KidoTheme.textPrimary)),
            const SizedBox(height: 24),
            Container(
              padding: const EdgeInsets.all(24),
              decoration: KidoTheme.cardDecoration(color: KidoTheme.primary),
              child: Column(
                children: [
                  Text('$pct%', style: const TextStyle(fontSize: 56, fontWeight: FontWeight.w700, color: Colors.white)),
                  const Text('Score', style: TextStyle(color: Colors.white70, fontSize: 16)),
                  const SizedBox(height: 16),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    children: [
                      _resultStat('$_correct/$total', 'Correct'),
                      _resultStat('+$xpEarned', 'XP Earned'),
                    ],
                  ),
                ],
              ),
            ),
            const SizedBox(height: 24),
            Row(
              children: [
                Expanded(
                  child: OutlinedButton(
                    onPressed: () { setState(() { _currentIndex = 0; _correct = 0; _showResult = false; _isLoading = true; _selectedAnswer = null; }); _startQuiz(); },
                    child: const Text('Play Again'),
                  ),
                ),
                const SizedBox(width: 14),
                Expanded(
                  child: ElevatedButton(
                    onPressed: () => Navigator.pop(context),
                    child: const Text('Back to Games'),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _resultStat(String val, String label) {
    return Column(
      children: [
        Text(val, style: const TextStyle(color: Colors.white, fontWeight: FontWeight.w700, fontSize: 22)),
        Text(label, style: const TextStyle(color: Colors.white70, fontSize: 12)),
      ],
    );
  }

  @override
  void dispose() {
    _animController.dispose();
    super.dispose();
  }
}
