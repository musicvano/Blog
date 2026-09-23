---
title: "Case studies and common mistakes"
description: "Topic 11. Abstract Classes, Interfaces: Case Studies and Common Mistakes"
outline: [2, 3]
sourceHash: "986e4aac12cf8bc904f370abf968a7b548550f5b86551604dd2c32b19250f76c"
---

# Case studies and common mistakes

## Auditing an interface before implementation

Start with the client scenario. A lamp client may need only setOn, and a schedule client only schedule. One large interface with dozens of methods forces simple devices to implement meaningless stubs. It is better to separate the truly independent capabilities and pass the role that is needed.

For each operation, write down the preconditions, the result, the possible exceptions and the state after a failure. For example, a brightness of 0–100 does not automatically mean that zero turns the device off: that is a separate rule. In the example, the on state and the brightness are stored independently, and effective returns zero for a lamp that is off.

For a strategy, compare equal input amounts; for an observer, the same event before and after unsubscription; for a command, the state before execute, after execute, undo and redo. Tests should reflect the user-facing contract, not just call every method.

If explaining a single object requires tracing many diamonds, check whether roles and ownership have been mixed up. An extra level of abstraction should simplify the client. If it only hides a simple list behind a complex hierarchy, composition will be clearer.

## Checking abstractions and common failures

An attempt to create an abstract type must end with a compiler diagnostic. If a derived type is abstract too, check whether it implemented all pure virtual signatures, including const. The error is not fixed by randomly adding a constructor.

For a diamond, check the Person addresses obtained through Student and Employee using valid language casts. With a virtual base, they must refer to a single subobject. This is a safe identity check that does not read hidden bytes and does not depend on specific ABI offsets.

For multiple interfaces, call the capabilities through each base reference. For collections of owners, check that lifetimes end. For non-owning links, record the order of creation and destruction and the forbidden scenarios, for example a callback after a listener has been destroyed.

In the report, separate what the compiler checked from what the run checked. A correct override does not prove that the discount is right for the domain; a correct amount does not prove that there is no invalid pointer in the subscriptions. A reliable implementation needs both kinds of checks and a clear contract.

## The limits of composition with discount strategies

An order should not ask a strategy about its concrete class to compute the amount. If a switch in Order has to be extended every time a policy is added, the abstraction has not done its job. The context should depend on the apply operation and its preconditions, not on the names of implementations.

At the same time, an overly general interface can hide necessary differences. If one policy needs the number of items and another needs the customer’s membership, a single cents number is no longer enough. You should pass a clearly described set of input data or separate the different scenarios. Global variables are not a good way to supply hidden context.

For testing, use a small control policy with a predictable result. Then you can check that Order really delegates the call and does not apply its own duplicated formula. Separate tests of the concrete percentage policy check the arithmetic and the rounding. These are different responsibilities.

## What happens to events during unsubscription

Suppose the station iterates over listeners A, B and C. If A removes B from the same vector during a callback, the positions of the elements may change, and the loop iterator becomes invalid. Even if the program happens not to crash, the contract of who receives the current event remains unclear.

There are several meaningful policies. You can forbid changing subscriptions during delivery, as in the example. You can queue the changes and apply them after the event is finished. You can iterate over a snapshot, but then the lifetime of the objects in the snapshot still has to be guaranteed.

So copying an array of raw pointers does not by itself solve the problem of a destroyed listener. It protects only the traversal structure, not the objects at those addresses. Keep iterator validity, pointer validity and the domain policy of event delivery separate.

## The undo and redo history invariant

After two commands A and B are executed, the done stack contains A, B, and redo is empty. Undo for B restores the state after A and moves B to undone. Redo executes B again and returns it to done. At every moment, a command belongs to one owner and to one logical state.

If you execute C after an undo, going back to the old B no longer matches the new history. The example clears undone after C executes successfully. If C is rejected before the text changes, the history must stay as it was. That is exactly why the checks and possible allocations are placed before the irreversible commit of the transition.

A general Command interface does not automatically guarantee that execute and undo have the required exception safety. Concrete commands must follow the History contract. Complex text changes may need snapshots, transactional swaps or a different history structure. The short Append example honestly restricts access to the text to its own commands.
