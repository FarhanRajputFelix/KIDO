import 'dart:async';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../core/constants.dart';
import '../../core/theme.dart';
import '../../providers/quiz_provider.dart';
import '../../models/quiz.dart';

class QuizScreen extends StatefulWidget {
  final String childId;
  final String? category;
  const QuizScreen({super.key, required this.childId, this.category});
  @override
  State<QuizScreen> createState() => _QuizScreenState();
}

class _QuizScreenState extends State<QuizScreen> {
  String _subject = 'Math';
  String _difficulty = 'medium';
  int _currentQ = 0;
  List<String?> _answers = [];
  Timer? _timer;
  int _seconds = 0;
  bool _showResult = false;
  Map<String, dynamic>? _result;

  @override
  void dispose() {
    _timer?.cancel();
    super.dispose();
  }

  void _startTimer() {
    _timer?.cancel();
    _seconds = 0;
    _timer = Timer.periodic(const Duration(seconds: 1), (_) {
      if (mounted) setState(() => _seconds++);
    });
  }

  Future<void> _generate() async {
    final qp = context.read<QuizProvider>();
    final ok = await qp.generateQuiz(widget.childId, _subject, _difficulty);
    if (ok && mounted) {
      setState(() {
        _currentQ = 0;
        _showResult = false;
        _result = null;
        _answers = List.filled(qp.currentQuiz!.questions.length, null);
      });
      _startTimer();
    }
  }

  Future<void> _submit() async {
    _timer?.cancel();
    final qp = context.read<QuizProvider>();
    final result = await qp.submitAttempt(
      quizId: qp.currentQuiz!.id,
      childId: widget.childId,
      answers: _answers.map((a) => a ?? '').toList(),
      timeTaken: _seconds,
    );
    if (mounted) setState(() { _showResult = true; _result = result; });
  }

  @override
  Widget build(BuildContext context) {
    final qp = context.watch<QuizProvider>();

    if (qp.isGenerating) {
      return const Center(child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
        CircularProgressIndicator(),
        SizedBox(height: 16),
        Text('Generating your personalized quiz...', style: TextStyle(color: KidoTheme.textSecondary)),
        SizedBox(height: 8),
        Text('🤖 AI is adapting to your level', style: TextStyle(color: KidoTheme.primary, fontSize: 13)),
      ]));
    }
    if (qp.currentQuiz == null) return _setupScreen(qp);
    if (_showResult) return _resultScreen(qp.currentQuiz!, _result);
    return _quizScreen(qp.currentQuiz!);
  }

  Widget _setupScreen(QuizProvider qp) => ListView(padding: const EdgeInsets.all(20), children: [
    const SizedBox(height: 12),
    const Text('AI Quiz Generator', style: TextStyle(fontSize: 24, fontWeight: FontWeight.w800, color: KidoTheme.textPrimary)),
    const Text('Choose your topic and let AI create a personalized quiz', style: TextStyle(color: KidoTheme.textSecondary, height: 1.4)),
    const SizedBox(height: 28),
    const Text('Choose Subject', style: TextStyle(fontWeight: FontWeight.w700, color: KidoTheme.textPrimary, fontSize: 15)),
    const SizedBox(height: 12),
    Wrap(
      spacing: 8, runSpacing: 8,
      children: KidoConstants.subjects.map((s) => GestureDetector(
        onTap: () => setState(() => _subject = s),
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 200),
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
          decoration: BoxDecoration(
            color: _subject == s ? KidoTheme.primary : KidoTheme.background,
            borderRadius: BorderRadius.circular(20),
            border: Border.all(color: _subject == s ? KidoTheme.primary : Colors.grey.shade200),
          ),
          child: Text(s, style: TextStyle(
            color: _subject == s ? Colors.white : KidoTheme.textPrimary,
            fontWeight: FontWeight.w500,
          )),
        ),
      )).toList(),
    ),
    const SizedBox(height: 24),
    const Text('Difficulty', style: TextStyle(fontWeight: FontWeight.w700, color: KidoTheme.textPrimary, fontSize: 15)),
    const SizedBox(height: 12),
    Row(children: KidoConstants.difficulties.map((d) {
      final color = d == 'easy' ? KidoTheme.success : d == 'medium' ? KidoTheme.warning : KidoTheme.error;
      final emoji = d == 'easy' ? '🟢' : d == 'medium' ? '🟡' : '🔴';
      final desc = d == 'easy' ? 'For beginners' : d == 'medium' ? 'Moderate challenge' : 'Expert level';
      return Expanded(child: GestureDetector(
        onTap: () => setState(() => _difficulty = d),
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 200),
          margin: const EdgeInsets.symmetric(horizontal: 4),
          padding: const EdgeInsets.symmetric(vertical: 14),
          decoration: BoxDecoration(
            color: _difficulty == d ? color.withOpacity(0.12) : KidoTheme.background,
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: _difficulty == d ? color : Colors.grey.shade200, width: 2),
          ),
          child: Column(children: [
            Text(emoji, style: const TextStyle(fontSize: 20)),
            const SizedBox(height: 6),
            Text(d[0].toUpperCase() + d.substring(1),
                style: TextStyle(fontWeight: FontWeight.w700, color: _difficulty == d ? color : KidoTheme.textSecondary, fontSize: 13)),
            const SizedBox(height: 2),
            Text(desc, style: const TextStyle(fontSize: 9, color: KidoTheme.textSecondary), textAlign: TextAlign.center),
          ]),
        ),
      ));
    }).toList()),
    const SizedBox(height: 40),
    ElevatedButton.icon(
      onPressed: _generate,
      icon: const Text('🚀'),
      label: const Text('Generate AI Quiz'),
      style: ElevatedButton.styleFrom(padding: const EdgeInsets.symmetric(vertical: 16)),
    ),
    if (qp.error != null)
      Padding(
        padding: const EdgeInsets.only(top: 12),
        child: Text(qp.error!, style: const TextStyle(color: KidoTheme.error), textAlign: TextAlign.center),
      ),
  ]);

  Widget _quizScreen(Quiz quiz) {
    final q = quiz.questions[_currentQ];
    return Column(children: [
      LinearProgressIndicator(
        value: (_currentQ + 1) / quiz.questions.length,
        backgroundColor: Colors.grey.shade200,
        valueColor: const AlwaysStoppedAnimation(KidoTheme.primary),
        minHeight: 5,
      ),
      Padding(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
        child: Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
          Text('Q${_currentQ + 1} of ${quiz.questions.length}',
              style: const TextStyle(fontWeight: FontWeight.w600, color: KidoTheme.textSecondary)),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
            decoration: BoxDecoration(color: KidoTheme.primary.withOpacity(0.1), borderRadius: BorderRadius.circular(20)),
            child: Row(children: [
              const Icon(Icons.timer_outlined, size: 16, color: KidoTheme.primary),
              const SizedBox(width: 4),
              Text('${_seconds}s', style: const TextStyle(color: KidoTheme.primary, fontWeight: FontWeight.w600)),
            ]),
          ),
        ]),
      ),
      Expanded(
        child: ListView(padding: const EdgeInsets.fromLTRB(16, 0, 16, 16), children: [
          Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              color: KidoTheme.primary.withOpacity(0.05),
              borderRadius: BorderRadius.circular(20),
            ),
            child: Text(q.question, style: const TextStyle(fontSize: 17, fontWeight: FontWeight.w600, color: KidoTheme.textPrimary, height: 1.4)),
          ),
          const SizedBox(height: 20),
          ...q.options.asMap().entries.map((entry) {
            final idx = entry.key;
            final opt = entry.value;
            final selected = _answers[_currentQ] == opt;
            return GestureDetector(
              onTap: () => setState(() => _answers[_currentQ] = opt),
              child: AnimatedContainer(
                duration: const Duration(milliseconds: 200),
                margin: const EdgeInsets.only(bottom: 10),
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: selected ? KidoTheme.primary : Colors.white,
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: selected ? KidoTheme.primary : Colors.grey.shade200, width: 2),
                  boxShadow: selected ? [BoxShadow(color: KidoTheme.primary.withOpacity(0.25), blurRadius: 10, offset: const Offset(0, 4))] : [],
                ),
                child: Row(children: [
                  Container(
                    width: 34, height: 34,
                    decoration: BoxDecoration(
                      color: selected ? Colors.white.withOpacity(0.2) : KidoTheme.background,
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: Center(child: Text(
                      String.fromCharCode(65 + idx),
                      style: TextStyle(fontWeight: FontWeight.w700, color: selected ? Colors.white : KidoTheme.textPrimary),
                    )),
                  ),
                  const SizedBox(width: 14),
                  Expanded(child: Text(opt, style: TextStyle(
                    color: selected ? Colors.white : KidoTheme.textPrimary,
                    fontWeight: FontWeight.w500,
                  ))),
                ]),
              ),
            );
          }),
        ]),
      ),
      Padding(
        padding: const EdgeInsets.all(16),
        child: Row(children: [
          if (_currentQ > 0) ...[
            OutlinedButton(
              onPressed: () => setState(() => _currentQ--),
              child: const Text('Back'),
            ),
            const SizedBox(width: 12),
          ],
          Expanded(
            child: ElevatedButton(
              onPressed: _answers[_currentQ] == null ? null : () {
                if (_currentQ < quiz.questions.length - 1) {
                  setState(() => _currentQ++);
                } else {
                  _submit();
                }
              },
              child: context.watch<QuizProvider>().isSubmitting
                  ? const SizedBox(width: 20, height: 20, child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2))
                  : Text(_currentQ < quiz.questions.length - 1 ? 'Next Question' : 'Submit Quiz'),
            ),
          ),
        ]),
      ),
    ]);
  }

  Widget _resultScreen(Quiz quiz, Map<String, dynamic>? result) {
    final score = result?['score'] as int? ?? 0;
    final total = result?['totalQuestions'] as int? ?? quiz.questions.length;
    final xp = result?['xpEarned'] as int? ?? 0;
    final pct = total > 0 ? (score / total * 100).round() : 0;
    final emoji = pct >= 85 ? '🎉' : pct >= 65 ? '👍' : '💪';
    final color = pct >= 85 ? KidoTheme.success : pct >= 65 ? KidoTheme.warning : KidoTheme.error;
    final msg = pct >= 85 ? 'Outstanding!' : pct >= 65 ? 'Good Job!' : 'Keep Practicing!';

    return Center(
      child: Padding(
        padding: const EdgeInsets.all(24),
        child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
          Text(emoji, style: const TextStyle(fontSize: 72)),
          const SizedBox(height: 16),
          Text(msg, style: const TextStyle(fontSize: 28, fontWeight: FontWeight.w800, color: KidoTheme.textPrimary)),
          const SizedBox(height: 8),
          Text('Quiz Complete!', style: TextStyle(color: KidoTheme.textSecondary, fontSize: 16)),
          const SizedBox(height: 28),
          Container(
            padding: const EdgeInsets.all(28),
            decoration: BoxDecoration(color: color.withOpacity(0.08), borderRadius: BorderRadius.circular(24)),
            child: Column(children: [
              Text('$score / $total', style: TextStyle(fontSize: 44, fontWeight: FontWeight.w900, color: color)),
              const SizedBox(height: 4),
              Text('$pct% correct', style: TextStyle(color: color, fontSize: 16, fontWeight: FontWeight.w600)),
            ]),
          ),
          const SizedBox(height: 16),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 14),
            decoration: BoxDecoration(color: KidoTheme.gold.withOpacity(0.1), borderRadius: BorderRadius.circular(16)),
            child: Row(mainAxisSize: MainAxisSize.min, children: [
              const Text('🏆', style: TextStyle(fontSize: 26)),
              const SizedBox(width: 8),
              Text('+$xp XP earned!', style: const TextStyle(fontSize: 20, fontWeight: FontWeight.w800, color: KidoTheme.gold)),
            ]),
          ),
          const SizedBox(height: 32),
          SizedBox(
            width: double.infinity,
            child: ElevatedButton(
              onPressed: () {
                context.read<QuizProvider>().clearQuiz();
                setState(() { _showResult = false; _result = null; _currentQ = 0; });
              },
              child: const Text('Take Another Quiz'),
            ),
          ),
        ]),
      ),
    );
  }
}
