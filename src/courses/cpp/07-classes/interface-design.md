---
title: "Designing and testing a class"
description: "Topic 7. Classes and Objects: Designing and Testing a Class"
outline: [2, 3]
sourceHash: "9802e2bbaf306939e1f65a36cdfeef1b06072de55bebd0aa45c80c7733def6ab"
---

# Designing and testing a class

## Designing a minimal interface

Start with a scenario: “add a trip,” “book a room,” “lend a book.” Then
determine the data needed for the solution and the rules that must never be
broken. For a booking, these are the order of the dates and the absence of
overlaps; for a car, a non-negative amount of fuel and a sufficient reserve.

Every public member function adds another way to change the object. A generic
setter for every data member often allows invalid intermediate states. The
operation `reserve(from, to)` checks the interval as a whole; two independent
`setFrom` and `setTo` calls force the user to guess a safe order of calls. Put
the check next to the data.

A contract description must answer these questions: is an empty string allowed,
can the same action be repeated, is there an upper limit, how is an error
reported, and does the state change when an operation is rejected. These
answers turn into tests. A constructor given invalid arguments must refuse, not
leave an “almost ready” object with a flag that is easy to forget to check.

In the training examples, input is separated from the model. The account class
does not read `std::cin` and does not ask the user again: that is the job of the
console interface. Thanks to this, you can test the same class with `assert`
and later use it in a different interface.

## Diagnosing and checking invariants

An inaccessible data member must cause a compilation error: this is a useful
boundary of the interface. Do not fix it by making all data members `public`.
First find out what operation the user of the class is trying to perform and
whether there is already a member function that checks its validity.

A forgotten `const` shows up when a read member function is called on a
constant object. A wrong order of data members can show up as a compiler
warning or as a read of an uninitialized value. Place dependent data members
after the ones they depend on, and do not treat the order of the constructor’s
initializer list as a way to change a language rule.

For an account, test a zero balance, withdrawing the exact remaining balance, a
zero and a negative amount, and exceeding the balance and the upper limit.
After each rejected operation, separately check that the state is unchanged.
For a collection, test an empty set, a duplicate identifier, a full collection,
and removing an element that is already gone.

A test of the normal scenario proves only that one particular example works. It
does not prove that the arithmetic is safe across the whole range of `int`, does
not check the lifetime of a returned reference, and does not confirm thread
safety. Write the limitations down next to the contract, and extend them
deliberately only when the corresponding checks appear.

## Scenario walkthrough: a seat reservation class

Let us consider the requirement “enroll a student in a course with a limited
number of seats” before writing any code. The data members `capacity`,
`students`, and `waiting` do not explain the rules by themselves. First we
agree: the capacity is positive; a student ID is unique across both lists; the
number of enrolled students does not exceed the capacity; the waiting list is
ordered by the time of the request.

The public interface can consist of `enroll(id)`, `remove(id)`, and
`report() const`. There is no need for `setStudents` and `setWaiting`: they
would allow replacing a collection without checking uniqueness. The
implementation of `enroll` first looks for the ID in both lists. A repeated
request is rejected even if the student is currently only waiting. Then the
place to add the student is determined. Only after a successful check does the
corresponding collection change.

For `remove`, you need to distinguish three cases: an enrolled student, a
waiting student, and an unknown ID. Removing an enrolled student frees a seat
and may move the first waiting student in. Removing a waiting student does not
change the number of enrolled students. An unknown ID either causes an explicit
rejection or returns false: the chosen option must be consistent across the
whole interface.

Now you can see that the invariant covers **several data members at once**.
Separate checks that “each vector has an allowed size” do not rule out the same
ID appearing in both collections. Only a domain operation can preserve the
relationship between them. The console program only reads a command, calls a
member function, and shows the result; it must not move a student between data
members by hand.

For a capacity of 2, the test scenario is as follows: enroll A, enroll B,
put C on the waiting list, try A again, remove B. The result: A and C are
enrolled, and the waiting list is empty. The repeated attempt for A must not
change either list. This scenario is a more precise criterion than the
statement “the class works,” because it describes the transition, the result,
and the rejection.
