---
title: Tasks
description: "Topic 5. Pointers and Memory: task variants"
outline: [2, 3]
sourceHash: "559b4979ef6b47ee15ad4e8942186f3caabba9859ad32316ffde872790dd9776"
---

# Tasks

Complete the task of the chosen difficulty level for your variant number.

Mark the owners and the non-owning links on a diagram.

## Variants

### Variant 1. Patient queue {#v1}

**1. Initial level.** Create a console program. Read a count of up to 100 and sample patient names, and print the order of service. Build a singly linked queue with nodes on `unique_ptr`; after removing the last node, correctly reset the non-owning tail to null.

**2. Basic level.** Create a console program. Read a count of up to 100, sample patient names and a priority of 0–2 for each, and print the order of service. Store the queue in a singly linked list of `unique_ptr` nodes; serve the higher priority first and, for equal priorities, keep the order of arrival; all nodes have a single owner.

**3. Advanced level.** Create a console program. Read a count of up to 100 and sample patient names, and print the order of service. Store the queue in `unique_ptr` nodes. Accept the commands add, serve and cancel until end, with a unique ID and a priority of 0–2. Transfer ownership of nodes via move and reject unknown IDs; at the end, print the queue and verify that all nodes are released.

### Variant 2. Train composition {#v2}

**1. Initial level.** Create a console program. Read the count and the unique numbers of the cars, and print the train from head to tail and back. Create a list: next owns via `unique_ptr`, prev is a non-owning pointer. For an empty train, print empty.

**2. Basic level.** Create a console program. Read the count and the unique numbers of the cars, and print the train from head to tail and back. Store the train in a doubly linked list: next owns via `unique_ptr`, prev is non-owning. Accept commands to add and remove a car by number; after each change, check that prev and next are consistent and print the train in both directions.

**3. Advanced level.** Create a console program. Read two trains with unique car numbers into doubly linked lists (next is `unique_ptr`, prev is non-owning) and the uncoupling number; move the tail part between the lists without copying the cars. Print both trains from head to tail and back; test moving all nodes, a single node and a missing number.

### Variant 3. The Josephus problem {#v3}

**1. Initial level.** Create a console program. Read n from 1 to 100 and a positive step k; the participants are numbered 1..n. Count cyclically in increasing order of numbers, starting from 1; the current participant is counted first, every k-th is eliminated, and the next count starts from the eliminated participant’s successor. Print the order of elimination and the number of the last participant. Own the nodes in a container of `unique_ptr`, and form the ring with non-owning pointers. Update the neighboring links before destroying a node.

**2. Basic level.** Create a console program. Read n from 1 to 100 and a positive step k; the participants are numbered 1..n. Count cyclically in increasing order of numbers, starting from 1; the current participant is counted first, every k-th is eliminated, and the next count starts from the eliminated participant’s successor. Print the order of elimination and the number of the last participant. Build a ring with a single explicit owner for each node; test n=1, k=1 and k greater than n, and don’t dereference a removed node.

**3. Advanced level.** Create a console program. Read n from 1 to 100 and a positive step k; the participants are numbered 1..n. Count cyclically in increasing order of numbers, starting from 1; the current participant is counted first, every k-th is eliminated, and the next count starts from the eliminated participant’s successor. Print the order of elimination and the number of the last participant. Store the participants in a ring of nodes with a single owner for each. After each elimination, make the eliminated participant’s number the new step. Print a step-by-step trace and compare the result with an independent vector-based model for small n.

### Variant 4. A tree of terms {#v4}

**1. Initial level.** Create a console program. Read term/definition pairs until end; print the dictionary in alphabetical order. Build a binary tree with left/right on `unique_ptr`; a repeated term updates the definition.

**2. Basic level.** Create a console program. Read term/definition pairs until end; print the dictionary in alphabetical order. Store the dictionary in a binary search tree with left/right on `unique_ptr`. Support searching for and removing a term, including a node with two children; after each command, print the in-order traversal.

**3. Advanced level.** Create a console program. Read two dictionaries of term/definition pairs until end into binary search trees with left/right on `unique_ptr`; merge them into a new independent tree, keeping the second dictionary’s definition for identical terms. Print the result in alphabetical order and prove that changing the copy doesn’t change the sources; verify that the trees are released.

### Variant 5. Browser history {#v5}

**1. Initial level.** Create a console program. Read the commands visit URL and back until end; after each one, print the current page or empty. Implement the back history as a stack of `unique_ptr` nodes; going back transfers ownership without dangling references.

**2. Basic level.** Create a console program. Read the commands visit URL, back and forward until end; after each one, print the current page or empty. Store the history in two back/forward stacks of `unique_ptr` nodes; a new visit clears the forward history, and a failed navigation keeps the current page.

**3. Advanced level.** Create a console program. Read the commands visit URL, back, forward and clear until end; after each one, print the current page or empty. Store the history in two back/forward stacks of `unique_ptr` nodes. Read a non-negative limit for each stack at the start; delete the oldest entries beyond the limit. A new visit clears the forward history. Print both stacks and the current URL; test a limit of 0, navigation on empty stacks and the release of discarded nodes.

### Variant 6. An editor’s list of lines {#v6}

**1. Initial level.** Create a console program. Read the initial lines and the commands insert index text and erase index until end; print the text after each command. Store the lines in a singly linked list of `unique_ptr`; indices are zero-based, and insertion at the end is also allowed.

**2. Basic level.** Create a console program. Read the initial lines and the commands insert index text, erase index and undo until end; print the text after each command. Store the lines in a singly linked list of `unique_ptr`; undo reverts the last insertion or removal, and a removed node is kept in a single owner until it is restored.

**3. Advanced level.** Create a console program. Read the initial lines and the commands insert index text, erase index, undo and redo until end; print the text after each command. Store the lines in a singly linked list of `unique_ptr`. Support an unbounded undo/redo stack of nodes, and clear redo after a new edit. Print the text and the lengths of the histories; test undo after removing the last line.

### Variant 7. A family tree {#v7}

**1. Initial level.** Create a console program. Define sample names and parent–child relationships in code; read a name and print the ancestors. Children are stored as `shared_ptr`, the link to the parent as `weak_ptr`; use lock before access.

**2. Basic level.** Create a console program. Define sample names and parent–child relationships in code; read a name and print the ancestors. Children are stored as `shared_ptr`, the parent as `weak_ptr`. Check for the absence of a cycle before adding a link, and forbid a second parent in this simplified model; print the tree and the reasons for rejections.

**3. Advanced level.** Create a console program. Define sample names and parent–child relationships in code (children are `shared_ptr`, the parent is `weak_ptr`); read a name and print the ancestors. Allow detaching a branch and moving it to another parent via commands from the keyboard. Print the ancestors after the move, and check expired after all owners of the branch are removed.

### Variant 8. A teaching social network {#v8}

**1. Initial level.** Create a console program. Read user IDs and friendship pairs; for each user, print the list of available friends. The registry owns the users via `shared_ptr`, and a friendship holds a `weak_ptr`; skip expired links.

**2. Basic level.** Create a console program. Read user IDs and friendship pairs; for each user, print the list of available friends. The registry owns the users via `shared_ptr`, and a friendship holds a `weak_ptr`. Support a command to delete a user and clean up expired links without creating ownership cycles; print the updated network.

**3. Advanced level.** Create a console program. Read user IDs and friendship pairs; for each user, print the list of available friends. The registry owns the users via `shared_ptr`, and a friendship holds a `weak_ptr`. Find the shortest friendship path between two entered IDs. Obtain temporary `shared_ptr` objects only via lock; after clearing the registry, verify that all users are destroyed.

### Variant 9. Books and readers {#v9}

**1. Initial level.** Create a console program. Define books with an ID and a title in code, and read loan and return commands; print the books of each sample reader. The catalog and an active loan jointly own the book description via `shared_ptr`; one book can have several independent references to its description.

**2. Basic level.** Create a console program. Define books with an ID and a title in code, and read loan and return commands; print the books of each sample reader. The catalog and the loans jointly own the book description via `shared_ptr`. Read the number of available copies of each book separately from the description, and reject a loan that exceeds the stock; print the remaining stock without using `use_count` as a business counter.

**3. Advanced level.** Create a console program. Define books with an ID and a title in code, and read loan and return commands; print the books of each sample reader. The catalog and the loans jointly own the book description via `shared_ptr`. Support removing a description from the catalog: an active loan keeps it alive until the return. Print the availability of the description via `weak_ptr` before and after the last return.

### Variant 10. A dynamic matrix {#v10}

**1. Initial level.** Create a console program. Read the number of rows and columns, 1–20, and the matrix elements; print the table and the sum of the elements. Allocate one contiguous array with `new[]`, index it as row\*cols+col, and finish with `delete[]`. Check the dimensions before allocating.

**2. Basic level.** Create a console program. Read the number of rows and columns, 1–20, and the matrix elements; print the table and the sum of the elements. Read two compatible matrices and compute the product in a third buffer; use `unique_ptr` to release the arrays automatically, and check compatibility.

**3. Advanced level.** Create a console program. Read the number of rows and columns, 1–20, and the matrix elements into a contiguous dynamic array; print the table and the sum of the elements. Implement an independent deep copy of the buffer and a transpose into a new buffer. Read a coordinate and a new value for the copy, and print both matrices, proving their independence and the absence of leaks.

### Variant 11. A sensor ring buffer {#v11}

**1. Initial level.** Create a console program. Read a capacity of 1–100 and a series of numbers until end; print the stored values starting from the oldest. Allocate a raw array with `new[]`, and maintain head and count; when the buffer is full, reject a new value without changing the buffer. Release it with `delete[]` at the end.

**2. Basic level.** Create a console program. Read a capacity of 1–100 and a series of numbers until end; print the stored values starting from the oldest. Store them in a ring buffer on a `new[]` array with head and count; when the buffer is full, overwrite the oldest value; after each addition, print the logical order and the average of the stored data.

**3. Advanced level.** Create a console program. Read a capacity of 1–100 and a series of numbers until end into a ring buffer on a `new[]` array with head and count; print the stored values starting from the oldest. Add a resize command with a new positive capacity; keep the newest values in a new array, and release the old one after a successful transfer. Test shrinking, growing and a capacity of 1.

### Variant 12. A polynomial on a list {#v12}

**1. Initial level.** Create a console program. Read coefficient/degree pairs, with degrees 0–20; print the nonzero terms in decreasing order of degree. Store the terms in a list of `unique_ptr`, combine equal degrees and remove zero coefficients.

**2. Basic level.** Create a console program. Read two polynomials as coefficient/degree pairs, with degrees 0–20; store the terms in lists of `unique_ptr`, combining equal degrees. Build the sum in an independent list; print both sources and the result as nonzero terms in decreasing order of degree.

**3. Advanced level.** Create a console program. Read two polynomials as coefficient/degree pairs, with degrees 0–20, coefficients of at most 100 in absolute value and no more than 20 terms each; store the terms in lists of `unique_ptr`. Multiply the polynomials, combine repeated degrees, print the product as nonzero terms in decreasing order of degree, and check the evaluation at x=0 and x=1.

### Variant 13. A sparse matrix {#v13}

**1. Initial level.** Create a console program. Read dimensions of up to 20×20 and row,col,value triples; print a dense table. Represent each row as a list of `unique_ptr` nodes for the nonzero elements, check the indices before access, and replace a repeated coordinate.

**2. Basic level.** Create a console program. Read two sparse matrices of the same shape, up to 20×20, as row,col,value triples; store each row as a list of `unique_ptr` nodes for the nonzero elements. Add the matrices without storing zero sums; print the number of nodes and a dense table.

**3. Advanced level.** Create a console program. Read dimensions of up to 20×20 and row,col,value triples; store each row of the sparse matrix as a list of `unique_ptr` nodes for the nonzero elements; print a dense table. Build the transposed matrix and the product with an entered vector of compatible length. Print the results, and test a zero matrix and the clearing of all lists.

### Variant 14. A big integer {#v14}

**1. Initial level.** Create a console program. Read two non-negative decimal numbers of up to 100 digits; print their sum. Store the digits in a list of `unique_ptr`, least significant first, and perform the carry of addition node by node; remove extra leading zeros in the output.

**2. Basic level.** Create a console program. Read two non-negative decimal numbers of up to 100 digits and store the digits in lists of `unique_ptr`, least significant first; print their sum. Compare the numbers and subtract the smaller from the larger, and print the sign relative to the input order and the absolute value of the difference; test equality.

**3. Advanced level.** Create a console program. Read two non-negative decimal numbers of up to 100 digits and store the digits in lists of `unique_ptr`, least significant first; print their sum. Implement multiplication of the digits in the lists with carries, without converting the whole string to a built-in numeric type. Print the product and test multiplication by 0, 1 and 99.

### Variant 15. A task scheduler {#v15}

**1. Initial level.** Create a console program. Read task IDs and names; print the execution queue. Create each task as a `unique_ptr` and pass it into the queue via move; don’t dereference the source after the transfer.

**2. Basic level.** Create a console program. Read task IDs and names, create each one as a `unique_ptr` and place it in the ready queue. Accept commands to move a task by ID between the ready and waiting queues via move; print both queues, and forbid duplicate IDs.

**3. Advanced level.** Create a console program. Read task IDs and names, create each one as a `unique_ptr` and pass it into the queue via move; print the queue. Read a list of IDs for batch execution: first check that all tasks exist, then remove them from the queue and execute them. On a rejection, print the unchanged state; otherwise print the result; verify that executed tasks are destroyed.

### Variant 16. An image buffer {#v16}

**1. Initial level.** Create a console program. Read dimensions of up to 20×20 and integer brightness values of 0–255; print the pixel matrix. Use a contiguous `new[]`/`delete[]` array and mirror each row horizontally.

**2. Basic level.** Create a console program. Read dimensions of up to 20×20 and integer brightness values of 0–255; print the pixel matrix. Rotate the image by 90 degrees into a new `unique_ptr` array, swapping the dimensions; print the result.

**3. Advanced level.** Create a console program. Read dimensions of up to 20×20 and integer brightness values of 0–255 into a contiguous dynamic array; print the pixel matrix. Implement a deep copy and cropping of a rectangle by entered coordinates. Print the original and the cropped copy; check for out-of-bounds coordinates before allocating, and check that the buffers are independent.

### Variant 17. An expression tree {#v17}

**1. Initial level.** Create a console program. Read a postfix expression of integers and the signs +, -; print its value and the infix form with parentheses. Build the nodes on `unique_ptr` using a stack of owners; check for two operands before an operation.

**2. Basic level.** Create a console program. Read a postfix expression of real numbers and the signs +, -, \*, /; build an expression tree with `unique_ptr` nodes using a stack of owners; print its value and the infix form with parentheses. Reject a zero divisor and an incomplete expression; print a diagnosis without leaking the partial tree.

**3. Advanced level.** Create a console program. Read a postfix expression of integers and the signs +, -; build an expression tree with `unique_ptr` nodes; print its value and the infix form with parentheses. Create an independent copy of the tree and replace all numeric leaves in it with their absolute values; print both expressions and their results, and check that the nodes are independent.

### Variant 18. A route graph {#v18}

**1. Initial level.** Create a console program. Read vertex names and pairs of adjacent vertices of an undirected graph; print the adjacency lists. The registry owns the vertices via `shared_ptr`, and edges hold `weak_ptr`; reject loops and duplicate edges.

**2. Basic level.** Create a console program. Read vertex names and pairs of adjacent vertices of an undirected graph; the registry owns the vertices via `shared_ptr`, and edges hold `weak_ptr`; print the adjacency lists. Read a start and an end, and find the shortest path by the number of edges; skip expired links, and print the path or none.

**3. Advanced level.** Create a console program. Read vertex names and pairs of adjacent vertices of an undirected graph; the registry owns the vertices via `shared_ptr`, and edges hold `weak_ptr`; print the adjacency lists. Support deleting a vertex and cleaning up expired edges; after each deletion, repeat the shortest path search between the entered vertices. Print the result and prove that all vertices are destroyed after the registry is cleared.

### Variant 19. A hierarchical menu {#v19}

**1. Initial level.** Create a console program. Define a tree of sections and dishes with names and prices in kopiykas in code; print the menu with indentation. Children belong to their parent via `unique_ptr`; count the dishes recursively.

**2. Basic level.** Create a console program. Define a tree of sections and dishes with names and prices in kopiykas in code; children belong to their parent via `unique_ptr`; print the menu with indentation. Read a section name, and print the number of dishes and the minimum price in its subtree; report the absence of dishes separately.

**3. Advanced level.** Create a console program. Define a tree of sections and dishes with names and prices in kopiykas in code; children belong to their parent via `unique_ptr`; print the menu with indentation. Accept a command to move a section between two parents; forbid moving it into its own subtree. Transfer ownership without copying, print the tree and check that the total number of dishes is unchanged.

### Variant 20. Player inventory {#v20}

**1. Initial level.** Create a console program. Read item IDs and names for two sample players; print the inventories. Each item has a single `unique_ptr` owner; transfer the entered ID to the first or the second player via move.

**2. Basic level.** Create a console program. Read item IDs and names for two sample players; each item has a single `unique_ptr` owner; print the inventories. Set the capacity of each inventory and transfer an item by ID via move, checking the space and the ID before the transfer; a failed transfer doesn’t lose the item.

**3. Advanced level.** Create a console program. Read item IDs and names for two sample players; each item has a single `unique_ptr` owner; print the inventories. Swap two items by ID without copying the objects; check both IDs first. Print the results and check that the state is unchanged when the second item is missing.

### Variant 21. An image cache {#v21}

**1. Initial level.** Create a console program. Define resources with an ID and a sample pixel array in code; read the commands load ID and release ID, and print the cache state. The cache stores `weak_ptr`, the client `shared_ptr`; load uses lock or creates a new resource.

**2. Basic level.** Create a console program. Define resources with an ID and a sample pixel array in code; read the commands load ID and release ID, and print the cache state. The cache stores `weak_ptr`, the clients `shared_ptr`. Support two independent clients and a counter of actual loads; report when a repeated load uses a live resource.

**3. Advanced level.** Create a console program. Define resources with an ID and a sample pixel array in code; read the commands load ID and release ID, and print the cache state. The cache stores `weak_ptr`, the clients `shared_ptr`. Support cleaning up expired entries, and compare the addresses of live resources only. Test the release after the last client and a repeated load; the cache must not extend a resource’s lifetime.

### Variant 22. A tournament bracket {#v22}

**1. Initial level.** Create a console program. Read 4 or 8 participant names and the match results; print the match tree and the winner. Build a complete binary tree on `unique_ptr`; for each match, read 0 or 1 to choose the winner of the two children.

**2. Basic level.** Create a console program. Read 4 or 8 participant names and the match results (0 or 1 is the winner of the two children); build a complete binary tree of matches on `unique_ptr`; print the tree and the winner. Find the path of an entered participant to the final; the non-owning link to the parent must not outlive the tree.

**3. Advanced level.** Create a console program. Read 4 or 8 participant names and the match results; build a complete binary tree of matches on `unique_ptr`; print the tree and the winner. Create an independent copy of the bracket for an alternative prediction, change one result and recompute the dependent matches. Print both finals without changing the original.

### Variant 23. C strings {#v23}

**1. Initial level.** Create a console program. Read two ASCII strings of up to 100 characters; print the result of concatenation and of a search for an entered character. Allocate a char array of sufficient size with room for the null terminator; write your own copy and search functions, and finish with `delete[]`.

**2. Basic level.** Create a console program. Read two ASCII strings of up to 100 characters into dynamic null-terminated char arrays; print the result of concatenation and of a search for an entered character. The concatenation function takes the capacity and refuses before writing if there isn’t enough space. Print the unchanged buffer on a refusal, and test empty strings.

**3. Advanced level.** Create a console program. Read an ASCII string of up to 100 characters into a dynamic char array, and a delimiter character. Split the string into non-owning start/length ranges without global state. Print all tokens, including empty ones; the owner of the original buffer must outlive all the ranges.

### Variant 24. A particle pool {#v24}

**1. Initial level.** Create a console program. Read a capacity of 1–100 and the commands create x y and erase index until end; print the active particles. Allocate one array of particles and an array of occupancy flags; reuse the first free position, and don’t allocate a separate object for each create.

**2. Basic level.** Create a console program. Read a capacity of 1–100 and the commands create x y and erase index generation until end; print the active particles. Store the particles in one array with occupancy flags, and reuse the first free position. Create returns an index/generation handle; after erase, increment the generation and reject the old handle.

**3. Advanced level.** Create a console program. Read a capacity of 1–100 and the commands create x y and erase index generation until end; print the active particles. Store the particles in one pool array, and use an index/generation handle; after a removal, increment the generation. Add moving the active particles by an entered vector and a report of the number of creations/reuses. Test a full pool, a double erase and a stale handle without dereferencing released memory.

### Variant 25. Calculator undo {#v25}

**1. Initial level.** Create a console program. Read an initial number and the commands add number and undo until end; print the state after each command. Store the previous states in a stack of `unique_ptr` nodes, and support add and undo without copying the list.

**2. Basic level.** Create a console program. Read an initial number and the commands add number, undo and redo until end; print the state after each command. Store the previous states in a stack of `unique_ptr` nodes, and the undone ones in a second stack for redo; a new add clears the future states; an undo/redo on an empty stack prints a message.

**3. Advanced level.** Create a console program. Read an initial number and the commands add number, undo and redo until end; print the state after each command. Store the states in two stacks of `unique_ptr` nodes; a new add clears redo. Read a non-negative limit for each stack, and release the oldest nodes beyond the limit. Print the stack sizes and test a limit of 0, consecutive undos and the clearing of redo after a new action.

### Variant 26. Sorting lists {#v26}

**1. Initial level.** Create a console program. Read two sorted lists of integers; print the merged sorted list. The nodes are owned by `unique_ptr`; merge the lists by moving nodes, without creating copies of the values in new nodes.

**2. Basic level.** Create a console program. Read an unsorted list of integers into `unique_ptr` nodes and perform a merge sort, splitting ownership into two halves and merging them by moving nodes; print the result.

**3. Advanced level.** Create a console program. Read an unsorted list of integers into `unique_ptr` nodes, attach the original index to each number and sort stably with a merge sort that moves nodes. Print the number/index pairs, and test an empty list, duplicates and that the exact number of nodes is preserved.

### Variant 27. A delivery route {#v27}

**1. Initial level.** Create a console program. Read stop names and their coordinates on a plane; print the order and the total Euclidean length of the route. Create a doubly linked list: next is `unique_ptr`, prev is a non-owning pointer; also print the reverse traversal.

**2. Basic level.** Create a console program. Read stop names and their coordinates on a plane into a doubly linked list (next is `unique_ptr`, prev is non-owning); print the order and the total Euclidean length of the route. Read two indices and swap the corresponding nodes without copying data; recompute the length, and test adjacent nodes and the end positions.

**3. Advanced level.** Create a console program. Read stop names and their coordinates on a plane into a doubly linked list (next is `unique_ptr`, prev is non-owning); print the order and the total Euclidean length of the route. Move an entered segment of the route after another stop, rejecting a position inside the segment. Print both traversal directions, the length and the prev/next check.

### Variant 28. A teaching file catalog {#v28}

**1. Initial level.** Create a console program. Define a tree of directories and files with sizes in bytes in code; print the tree and the total size. Don’t modify the real file system. Each node has a single `unique_ptr` owner; recursively sum only the file sizes.

**2. Basic level.** Create a console program. Define a sample tree of directories and files with sizes in bytes in code, where each node has a single `unique_ptr` owner; print the tree and the total size. Don’t modify the real file system. Read a path in the tree, and print the size of the subtree or not found; distinguish a file from a directory.

**3. Advanced level.** Create a console program. Define a sample tree of directories and files with sizes in bytes in code, where each node has a single `unique_ptr` owner; print the tree and the total size. Don’t modify the real file system. Read a source and a destination directory, and move the subtree without copying. Forbid moving into its own descendant and name conflicts; print the new tree and the unchanged total size.

### Variant 29. A circular playlist {#v29}

**1. Initial level.** Create a console program. Read track titles and the commands next and previous until end; print the current track. Own the tracks in a container of `unique_ptr`, and represent the circular transitions with non-owning pointers; handle an empty list separately.

**2. Basic level.** Create a console program. Read track titles and the commands next, previous and delete until end; print the current track. A container of `unique_ptr` owns the tracks, and the circular transitions are non-owning pointers. Delete removes the current track, correctly relinking the neighbors before the release; test a list of one element.

**3. Advanced level.** Create a console program. Read track titles and the commands next and previous until end; print the current track. A container of `unique_ptr` owns the tracks, and the circular transitions are non-owning pointers. Implement shuffling of the order by an entered seed without moving the objects themselves. Print a full cycle, and check that each live track appears exactly once and that a repeated seed reproduces the order.

### Variant 30. Tracking allocated memory {#v30}

**1. Initial level.** Create a console program. Read the lengths of several sample arrays, 1–100; print the counters of allocations, releases and live blocks. Write paired allocate/release functions for int arrays with explicit `new[]`/`delete[]`; don’t redefine the global operators. Set the pointer to null after release.

**2. Basic level.** Create a console program. Read the lengths of several sample arrays, 1–100; print the counters of allocations, releases and live blocks. Wrap the array in a `unique_ptr` with a custom deleter that updates the counter; test an early return from a function, and print zero live blocks.

**3. Advanced level.** Create a console program. Read the lengths of several sample arrays, 1–100, and a number k; allocate int arrays in `unique_ptr` with counters of allocations, releases and live blocks. In code, simulate a failure (an exception) after the k-th successful allocation. Check that previously created buffers are released automatically on the exception; print the balance of the counters and return a nonzero code only on a leak.

## Procedure

1. Draw the ownership graph and explain the lifetimes of the objects.
1. Choose a container, unique_ptr or shared_ptr based on the requirements.
1. Test an empty structure, adding and removing all nodes.
1. Make sure observers are not used after destruction.
1. Run a diagnostic AddressSanitizer build.
1. Match the messages to the ownership rules and fix the causes.
1. Save the code, the diagram and the real test results in Git.
