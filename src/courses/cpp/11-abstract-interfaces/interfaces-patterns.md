---
title: "Interfaces and interaction patterns"
description: "Topic 11. Abstract Classes, Interfaces: Interfaces and Interaction Patterns"
outline: [2, 3]
sourceHash: "58e429af0f44b2b757a5839b0b10ffab96636dbe94cafca826147a6eebe361c7"
---

# Interfaces and interaction patterns

## A pure virtual destructor and a function definition

A pure virtual function can have a separate definition. This does not automatically make the class concrete: the pure specifier still requires an override. The definition can be used by explicitly qualifying the base method in a derived implementation.

A pure virtual destructor is special because it needs a definition when derived objects are destroyed: the base part always goes through its own destruction stage. The standard declaration `virtual ~Base() = 0;` is complemented by the definition `Base::~Base() = default;` outside the class. A missing definition is exactly what can show up as a linker error.

For an ordinary interface, it is often simpler to use `virtual ~Base() = default` and a pure virtual domain operation. The interface is already abstract because of that operation, so making the destructor pure as well gives no advantage. Choose the minimal declaration that expresses the required contract.

If deletion through the interface is forbidden, a protected non-virtual destructor is possible. But our collection of unique_ptr to the interface needs a public virtual destructor. Align the right to destroy with the ownership model before you choose the specifiers.

## Multiple interfaces and name ambiguity

A class can implement several independent interfaces: a lamp turns on, adjusts its brightness and has a schedule. A client that only needs switching on gets a Switchable&, not the whole set of capabilities. This reduces the client’s dependency on a concrete device.

Several bases can declare the same names. `A::f()` and `B::f()` select an implementation explicitly, and using-declarations can merge the required overloads into the lookup set. They do not remove duplicated subobjects and do not determine which domain state must be the single one.

For two interfaces with the same pure virtual signature, one derived implementation can satisfy both contracts. But the same signature does not prove the same meaning. If one reset clears the data and the other only resets a counter, merging them mechanically may contradict what one of the clients expects.

The simplest design with multiple inheritance often consists of interfaces without data and a single state owned by the concrete class. Complex networks of bases with shared data members need more justification and testing than the virtual keyword itself.

## The subobject model and ABI

An object with several bases has the corresponding base subobjects. A pointer to one base does not have to have the same numeric address as a pointer to another base of the same complete object. Valid conversions perform the required address adjustment.

Do not use reinterpret_cast as a way to “jump” between interfaces based on an assumption about the layout. You need the language conversions and, where appropriate, dynamic_cast. The conceptual diagram shows the roles of subobjects, not byte offsets or a stable number of hidden pointers.

The MSVC debugger may show separate internal fields and tables for different bases. What you see depends on the compiler, the optimization and the particular class. This topic does not use undocumented layout dump options: an object diagram and the ordinary Locals window are enough to understand the contract.

If a library has a stable binary interface, changing the bases or virtual methods can break compatibility with an already compiled client. This is a reason to design public interfaces carefully, even though the training examples are built together from source code.

## Observer: subscription and lifetime

The **Observer** pattern notifies registered listeners about an event. The source should not know how each listener reacts; the update interface is enough. In the example, a weather station passes a new temperature to a display.

A non-owning pointer to a listener does not extend its lifetime. You must either unsubscribe the listener before it is destroyed, or make sure the listeners outlive the source, or choose another ownership model. An automatic collection of plain addresses is not lifetime management.

A separate contract covers changes to subscriptions during a notification. If a callback removes an element of the vector, the loop iterator may become invalid. In the short example, changing subscriptions inside a callback is forbidden and never happens; a broader design can use a snapshot or a queue of changes.

Subscribing the same object again also has defined behavior: here it does not create a duplicate. After unsubscribing, the next event does not arrive. These two scenarios matter more than having the fashionable word Observer in the class name.

## Command: execution and history

The **Command** pattern represents an action as a separate object with execute and, if needed, undo. A command stores the parameters of the action and the information needed to restore the previous state. An editor can store different commands through a shared interface without inspecting the type of each action.

For appending text, undo removes exactly the appended suffix. A replacement needs the old text; simply executing again with a negative argument is not a universal rollback. The history must contain enough data to restore the previous valid state.

After undo, a command moves to redo. If the user performs a new action, the old redo branch is usually discarded because it belongs to a different future. This is a product rule, not an automatic property of vector. In the example, it is implemented explicitly.

The operation must account for a memory allocation failure: you cannot change the text and then lose the ability to record the command because the history failed to grow. The training editor reserves space before execution; a restricted command type allows a simple justification that the following steps do not throw.

## Mixins, composition and hierarchy size

A **mixin** adds a small shared capability: a counter, an identifier or logging. It should not turn into a random container for all helper methods. Dependencies and name conflicts still remain part of the design.

Composition is convenient when an object **has** an algorithm or a component rather than **is** one. An order has a discount policy, an editor has a command history, a station has listeners. Such relationships do not require turning an order into a subclass of a discount or a station into a subclass of a display.

Inheritance is justified when the client really works through a shared abstraction and needs to substitute concrete implementations. Composition lets you change parts more independently; the two approaches are often combined: a strategy inherits an interface, and the context owns it as a data member.

Static polymorphism through templates selects behavior at compile time, dynamic polymorphism does so through a runtime object. Neither should be declared universally better. The choice depends on when the types are known, whether a heterogeneous collection is needed and what the library contract is.
