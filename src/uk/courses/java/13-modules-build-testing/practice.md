---
title: "Практика"
description: "Тема 13. Модулі, Maven, Gradle, JUnit: розібрані приклади"
outline: [2, 3]
---

# Практика

## Приклад 1. Тести дробу

Використайте Maven POM лекції, змінивши artifactId на `fraction` і mainClass на `ua.knu.fraction.Fraction`. Додайте два наведені файли в стандартні каталоги. У прикладі дріб приводиться до спільного знака й скорочується; нульовий знаменник заборонено. BigInteger дозволяє не приховувати переповнення проміжного добутку.

`src/main/java/ua/knu/fraction/Fraction.java`:

```java
package ua.knu.fraction;

import java.math.BigInteger;
import java.util.Objects;

public record Fraction(BigInteger numerator, BigInteger denominator) {
    public Fraction {
        Objects.requireNonNull(numerator);
        Objects.requireNonNull(denominator);
        if (denominator.signum() == 0) {
            throw new IllegalArgumentException("Zero denominator");
        }
        if (denominator.signum() < 0) {
            numerator = numerator.negate();
            denominator = denominator.negate();
        }
        BigInteger gcd = numerator.gcd(denominator);
        numerator = numerator.divide(gcd);
        denominator = denominator.divide(gcd);
    }

    public static Fraction of(long numerator, long denominator) {
        return new Fraction(BigInteger.valueOf(numerator),
            BigInteger.valueOf(denominator));
    }

    public Fraction add(Fraction other) {
        BigInteger n = numerator.multiply(other.denominator)
            .add(other.numerator.multiply(denominator));
        return new Fraction(n,
            denominator.multiply(other.denominator));
    }

    public static void main(String[] args) {
        Fraction sum = of(1, 2).add(of(1, 3));
        System.out.println(sum.numerator + "/" + sum.denominator);
    }
}
```

`src/test/java/ua/knu/fraction/FractionTest.java`:

```java
package ua.knu.fraction;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class FractionTest {
    private Fraction half;

    @BeforeEach
    void prepare() { half = Fraction.of(1, 2); }

    @Test
    void addsAndReduces() {
        assertEquals(Fraction.of(5, 6), half.add(Fraction.of(1, 3)));
        assertEquals(half, Fraction.of(2, 4));
    }

    @Test
    void normalizesSignAndZero() {
        assertEquals(Fraction.of(-1, 2), Fraction.of(1, -2));
        assertEquals(Fraction.of(0, 1), Fraction.of(0, 7));
    }

    @Test
    void rejectsZeroDenominator() {
        assertThrows(IllegalArgumentException.class,
            () -> Fraction.of(1, 0));
    }
}
```

`mvn test` запускає три тести; запуск main виводить `5/6`. Незмінний record забезпечує структурну рівність нормалізованих дробів. Тести не повинні залежати від тексту `toString`, якщо контракт задачі визначений числовими значеннями.

## Приклад 2. Провайдер форматування

Створіть три модулі у `src`. API оголошує інтерфейс, провайдер реалізує його, а клієнт використовує ServiceLoader. Клієнт не імпортує клас UpperFormatter, тому провайдер можна замінити без зміни виклику предметного сервісу.

`src/format.api/module-info.java` і `src/format.api/format/api/Formatter.java`:

```java
module format.api {
    exports format.api;
}
```

```java
package format.api;

public interface Formatter {
    String format(String text);
}
```

`src/format.upper/module-info.java` і `src/format.upper/format/upper/UpperFormatter.java`:

```java
module format.upper {
    requires format.api;
    provides format.api.Formatter with format.upper.UpperFormatter;
}
```

```java
package format.upper;

import format.api.Formatter;
import java.util.Locale;

public final class UpperFormatter implements Formatter {
    public UpperFormatter() {}

    @Override
    public String format(String text) {
        return text.toUpperCase(Locale.ROOT);
    }
}
```

`src/format.cli/module-info.java` і `src/format.cli/format/cli/Main.java`:

```java
module format.cli {
    requires format.api;
    uses format.api.Formatter;
}
```

```java
package format.cli;

import format.api.Formatter;
import java.util.ServiceLoader;

public final class Main {
    public static void main(String[] args) {
        Formatter formatter = ServiceLoader.load(Formatter.class)
            .findFirst().orElseThrow(() ->
                new IllegalStateException("No formatter provider"));
        System.out.println(formatter.format("Java modules"));
    }
}
```

```powershell
javac --release 27 --module-source-path src -d out `
  -m format.api,format.upper,format.cli
java --module-path out -m format.cli/format.cli.Main
```

Результат – `JAVA MODULES`. Публічний пакет провайдера не потребує exports лише заради ServiceLoader. Якщо провайдерів декілька, `findFirst` не задає предметно гарантованої переваги: додайте ідентифікатор та явний вибір. Для jlink із пошуком сервісів перевіряйте включення провайдерів через `--bind-services`.

## Приклад 3. Багатопроєктний Gradle

Модуль `core` містить обчислення вартості, `cli` – main. Це два Gradle-проєкти без JPMS-дескрипторів: приклад навмисно показує відмінність між модулем збирання та модулем Java. Підготуйте JDK 27 toolchain за лекцією.

`settings.gradle.kts`:

```kotlin
rootProject.name = "shop"
include("core", "cli")
```

Кореневий `build.gradle.kts`:

```kotlin
plugins { java }
subprojects {
    apply(plugin = "java")
    repositories { mavenCentral() }
    extensions.configure<JavaPluginExtension> {
        toolchain.languageVersion.set(JavaLanguageVersion.of(27))
    }
    dependencies {
        "testImplementation"(platform("org.junit:junit-bom:6.1.3"))
        "testImplementation"("org.junit.jupiter:junit-jupiter")
        "testRuntimeOnly"(
            "org.junit.platform:junit-platform-launcher")
    }
    tasks.withType<Test>().configureEach { useJUnitPlatform() }
}
```

`core/build.gradle.kts` залиште порожнім. `cli/build.gradle.kts`:

```kotlin
plugins { application }
dependencies { implementation(project(":core")) }
application { mainClass.set("ua.knu.shop.Main") }
```

`core/src/main/java/ua/knu/shop/Price.java`:

```java
package ua.knu.shop;

public final class Price {
    private Price() {}

    public static long total(long cents, int count) {
        if (cents < 0 || count < 0) {
            throw new IllegalArgumentException("Negative input");
        }
        return Math.multiplyExact(cents, count);
    }
}
```

`cli/src/main/java/ua/knu/shop/Main.java`:

```java
package ua.knu.shop;

public final class Main {
    public static void main(String[] args) {
        System.out.println(Price.total(1250, 3));
    }
}
```

`core/src/test/java/ua/knu/shop/PriceTest.java`:

```java
package ua.knu.shop;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class PriceTest {
    @Test void calculates() {
        assertEquals(3750, Price.total(1250, 3));
        assertEquals(0, Price.total(1250, 0));
    }

    @Test void rejectsInvalidAndOverflow() {
        assertThrows(IllegalArgumentException.class,
            () -> Price.total(-1, 3));
        assertThrows(ArithmeticException.class,
            () -> Price.total(Long.MAX_VALUE, 2));
    }
}
```

`.\gradlew.bat :core:test :cli:run` запускає тести й виводить `3750`. Кошти зберігаються в цілих копійках, переповнення виявляється явно. Для додаткового пакування використовуйте `:cli:installDist`, яке створює локальний каталог запуску, а не встановлює програму в системний профіль.
