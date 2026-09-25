---
title: "Practice"
description: "Topic 13. Modules, builds, and testing: worked examples"
outline: [2, 3]
sourceHash: "99be506e7abb75942f1d033f46c717fbaf63596f003e474a25d0326ee0c5f923"
---

# Practice

## Example 1. Fraction tests

Use the Maven POM from the lecture, changing the artifactId to `fraction` and the mainClass to `ua.knu.fraction.Fraction`. Add the two files below to the standard directories. In the example, the fraction is normalized to a common sign and reduced; a zero denominator is prohibited. BigInteger means that overflow of an intermediate product is not hidden.

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

`mvn test` runs three tests; running main prints `5/6`. The immutable record provides structural equality of normalized fractions. Tests should not depend on the `toString` text if the task contract is defined by numeric values.

## Example 2. A formatting provider

Create three modules in `src`. The API declares an interface, the provider implements it, and the client uses ServiceLoader. The client does not import the UpperFormatter class, so the provider can be replaced without changing the call to the domain service.

`src/format.api/module-info.java` and `src/format.api/format/api/Formatter.java`:

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

`src/format.upper/module-info.java` and `src/format.upper/format/upper/UpperFormatter.java`:

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

`src/format.cli/module-info.java` and `src/format.cli/format/cli/Main.java`:

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

The result is `JAVA MODULES`. The provider's public package does not need exports just for ServiceLoader. If there are several providers, `findFirst` does not define a guaranteed domain preference: add an identifier and an explicit choice. For jlink with service lookup, check that the providers are included with `--bind-services`.

## Example 3. A multi-project Gradle build

The `core` module contains the cost calculation, and `cli` contains main. These are two Gradle projects without JPMS descriptors: the example deliberately shows the difference between a build module and a Java module. Prepare the JDK 27 toolchain as described in the lecture.

`settings.gradle.kts`:

```kotlin
rootProject.name = "shop"
include("core", "cli")
```

The root `build.gradle.kts`:

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

Leave `core/build.gradle.kts` empty. `cli/build.gradle.kts`:

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

`.\gradlew.bat :core:test :cli:run` runs the tests and prints `3750`. Money is stored in whole cents, and overflow is detected explicitly. For additional packaging, use `:cli:installDist`, which creates a local launch directory rather than installing the program into the system profile.
