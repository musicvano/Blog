---
title: "Підсумки"
description: "Тема 7. Векторизація SIMD: висновки та контрольні питання"
---

# Підсумки

## Висновки

SIMD – паралелізм усередині ядра: одна інструкція обробляє 4, 8 або 16 чисел у регістрах XMM, YMM чи ZMM. JIT .NET не векторизує цикли автоматично, тому векторизацію записують явно: переносним `Vector<T>` змінної ширини, векторами фіксованої ширини `Vector128/256/512` з перевіркою `IsHardwareAccelerated` або платформними інтринсиками з перевіркою `IsSupported` і запасним шляхом. Порівняння повертають маски, які замінюють умовні переходи (`ConditionalSelect`) або перетворюються на бітові маски (`ExtractMostSignificantBits`). Векторний цикл завжди доповнюють обробкою хвоста, а небезпечні методи завантаження використовують лише з перевіреними межами. Для типових операцій над масивами найкращий вибір – `TensorPrimitives`. Поєднання SIMD і потоків ефективне, коли обчислення переважає переміщення даних; інакше межею стає пропускна здатність пам’яті. Множення матриць показує всі рівні оптимізації: порядок циклів ikj, блочне множення для кешу, SIMD у внутрішньому циклі та потоки за рядками плиток дали прискорення в 105 разів. Метод Гаусса розпаралелюють у межах кроку виключення, метод Якобі – повністю, а Гаусса–Зейделя – червоно-чорним впорядкуванням. Векторизований код перевіряють дизасемблером і порівнюють з еталоном з допуском.

## Питання для самоперевірки

1. Що таке SIMD? Чим векторизація відрізняється від багатопотоковості?
2. Які векторні регістри мають процесори x86-64? Скільки чисел `float` і `double` у кожному?
3. Які набори інструкцій SIMD ви знаєте? Що таке AVX10 і навіщо він потрібен?
4. Чому JIT .NET і компілятори C++ без спеціальних ключів не векторизують суму `float`?
5. Від чого залежить `Vector<T>.Count`? Як змінити ширину `Vector<T>`?
6. Чим `Vector256<T>` відрізняється від `Vector<T>`? Навіщо перевіряти `IsHardwareAccelerated`?
7. Що повертає векторне порівняння? Як працюють `ConditionalSelect` і `ExtractMostSignificantBits`?
8. Що таке апаратні інтринсики? Як забезпечити роботу коду на процесорі без потрібного набору?
9. Як перевірити всі шляхи векторизованого коду на одному ПК?
10. Що таке хвіст масиву? Як його обробляють для суми та для пошуку?
11. Навіщо потрібні `MemoryMarshal.GetReference`, `LoadUnsafe` і `MemoryMarshal.Cast`? Які в них ризики?
12. Що таке вирівнювання пам’яті й коли використовують `NativeMemory.AlignedAlloc`?
13. Які операції надає `TensorPrimitives` і коли його варто обрати?
14. Чому потоки не прискорюють суму великого масиву понад межу пропускної здатності пам’яті?
15. Опишіть рівні BLAS. Чому порядок циклів ikj швидший за ijk?
16. Як працює блочне множення матриць і як вибрати розмір плитки? Що таке GFLOPS?
17. Які частини методу Гаусса можна розпаралелити?
18. Чому метод Якобі легко розпаралелюється, а Гаусса–Зейделя – ні? Що таке червоно-чорне впорядкування?

## Корисні посилання

- SIMD та апаратні інтринсики в .NET: <https://learn.microsoft.com/dotnet/standard/simd>
- Тип `Vector<T>`: <https://learn.microsoft.com/dotnet/api/system.numerics.vector-1>
- Простір імен `System.Runtime.Intrinsics`: <https://learn.microsoft.com/dotnet/api/system.runtime.intrinsics>
- Інтринсики x86: <https://learn.microsoft.com/dotnet/api/system.runtime.intrinsics.x86>
- Інтринсики Arm `AdvSimd`: <https://learn.microsoft.com/dotnet/api/system.runtime.intrinsics.arm.advsimd>
- `TensorPrimitives`: <https://learn.microsoft.com/dotnet/api/system.numerics.tensors.tensorprimitives>
- `NativeMemory.AlignedAlloc`: <https://learn.microsoft.com/dotnet/api/system.runtime.interopservices.nativememory.alignedalloc>
- Дизасемблер BenchmarkDotNet: <https://benchmarkdotnet.org/articles/features/disassembler.html>
- Intel Intrinsics Guide: <https://www.intel.com/content/www/us/en/docs/intrinsics-guide/index.html>
- BLAS: <https://www.netlib.org/blas/>
