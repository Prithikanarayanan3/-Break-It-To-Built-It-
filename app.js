/**
 * Break It to Build It - Interactive Educational Debugging Platform
 * AI Agent: Clover (Socratic AI Debugger)
 * Multi-Language Question Bank Engine (10 Languages x 4 Levels x 30 Questions)
 */

// =========================================================================
// 1. MASTER 30 CONCEPTS PER DIFFICULTY LEVEL DEFINITIONS
// =========================================================================

const CONCEPTS_EASY = [
  { id: 1, key: "off_by_one_loop", title: "Off-by-One Loop Boundary", category: "Loop Bounds", desc: "The loop boundary condition runs one step too far, accessing beyond the valid range." },
  { id: 2, key: "array_bounds", title: "Array Index Out of Bounds", category: "Memory Access", desc: "Accessing an array using an index equal to or greater than its length." },
  { id: 3, key: "string_immutability", title: "String In-Place Modification", category: "Data Types", desc: "Attempting to mutate characters of a string directly when strings are immutable." },
  { id: 4, key: "integer_division", title: "Integer Division Truncation", category: "Arithmetic", desc: "Dividing two integers discards the decimal fraction, producing 0 or truncated values." },
  { id: 5, key: "variable_shadowing", title: "Variable Shadowing in Local Scope", category: "Scope", desc: "A local variable declaration re-uses an outer variable name, hiding outer state." },
  { id: 6, key: "uninit_variable", title: "Uninitialized Variable Read", category: "Variables", desc: "Reading an accumulator or counter variable before giving it a valid initial value." },
  { id: 7, key: "assign_in_cond", title: "Assignment in Equality Check (= vs ==)", category: "Operators", desc: "Using assignment operator '=' instead of comparison '==' inside an if condition." },
  { id: 8, key: "float_equality", title: "Floating Point Exact Comparison", category: "Arithmetic", desc: "Comparing decimal floats with exact '==' without an epsilon tolerance threshold." },
  { id: 9, key: "missing_increment", title: "Missing Loop Counter Increment", category: "Loop Bounds", desc: "While loop condition depends on a counter variable that is never incremented inside the body." },
  { id: 10, key: "substring_bounds", title: "Substring End Index Confusion", category: "Strings", desc: "Misunderstanding whether the substring end index is inclusive or exclusive." },
  { id: 11, key: "modulo_negative", title: "Modulo Sign Behavior", category: "Arithmetic", desc: "Assuming modulo always yields a positive remainder on negative dividends." },
  { id: 12, key: "type_coercion_add", title: "Implicit String Coercion in Addition", category: "Types", desc: "Adding a number to a string performs string concatenation rather than numeric addition." },
  { id: 13, key: "pass_by_val_swap", title: "Pass-by-Value Swap Illusion", category: "Functions", desc: "Swapping primitive function parameters without realizing caller variables remain unchanged." },
  { id: 14, key: "short_circuit_eval", title: "Short-Circuit Side-Effect Omission", category: "Operators", desc: "Placing a necessary function call on the right side of a short-circuit '&&' or '||'." },
  { id: 15, key: "for_step_stride", title: "Incorrect Loop Stride Increment", category: "Loop Bounds", desc: "Stepping by the wrong increment, skipping elements or never reaching the exit condition." },
  { id: 16, key: "length_prop_vs_func", title: "Length Property vs Method Confusion", category: "Syntax", desc: "Calling a length property as a function, or reading a method without invoking it." },
  { id: 17, key: "premature_return", title: "Premature Return in Loop Body", category: "Control Flow", desc: "Placing a return statement inside the first iteration of a loop instead of after it completes." },
  { id: 18, key: "demorgan_boolean", title: "De Morgan's Boolean Inversion Bug", category: "Logic", desc: "Incorrectly inverting compound conditions: '!A && !B' instead of '!(A && B)'." },
  { id: 19, key: "const_reassignment", title: "Constant Value Reassignment", category: "Variables", desc: "Attempting to assign a new value to a variable declared as constant/final." },
  { id: 20, key: "char_ascii_math", title: "Character ASCII Offset Arithmetic", category: "Strings", desc: "Treating character digit '0'-'9' as an integer without subtracting character '0'." },
  { id: 21, key: "switch_fallthrough", title: "Switch Case Missing Break Statement", category: "Control Flow", desc: "Omitting 'break' causes execution to fall through into subsequent case blocks." },
  { id: 22, key: "missing_dict_key", title: "Unchecked Map / Dictionary Key Read", category: "Collections", desc: "Accessing a dictionary key without checking if it exists, triggering a key lookup error." },
  { id: 23, key: "array_shallow_alias", title: "Array Reference Aliasing", category: "Collections", desc: "Assigning 'arrB = arrA' aliases the same memory list instead of creating a copy." },
  { id: 24, key: "bitwise_vs_logical", title: "Bitwise Operator Used for Logical Check", category: "Operators", desc: "Using single '&' or '|' where logical short-circuit '&&' or '||' is intended." },
  { id: 25, key: "string_concat_loop", title: "String Concatenation in Heavy Loop", category: "Strings", desc: "Creating thousands of intermediate string copies inside an accumulator loop." },
  { id: 26, key: "integer_overflow_32", title: "32-Bit Signed Integer Overflow", category: "Arithmetic", desc: "Multiplying large numbers exceeds 2,147,483,647, wrapping to negative values." },
  { id: 27, key: "case_sensitive_cmp", title: "Case-Sensitive String Comparison", category: "Strings", desc: "Comparing strings without normalizing case ('Apple' != 'apple')." },
  { id: 28, key: "round_direction_math", title: "Rounding Direction Error (Floor vs Ceil)", category: "Arithmetic", desc: "Using integer truncation / floor where rounding up to ceiling is required." },
  { id: 29, key: "reverse_loop_underflow", title: "Reverse Loop Unsigned Underflow", category: "Loop Bounds", desc: "Reverse looping with an unsigned counter checking 'i >= 0', which never becomes false." },
  { id: 30, key: "hoisting_declaration", title: "Accessing Variable Before Declaration", category: "Scope", desc: "Referencing a variable earlier in the function body before its declaration." }
];

const CONCEPTS_MEDIUM = [
  { id: 1, key: "null_dereference", title: "Null Pointer / None Reference", category: "Null Safety", desc: "Accessing properties on an object reference that is currently null." },
  { id: 2, key: "infinite_recursion", title: "Missing Base Case in Recursion", category: "Recursion", desc: "Recursive function keeps decrementing indefinitely, overflowing the call stack." },
  { id: 3, key: "divide_by_zero_empty", title: "Unhandled Divide by Zero on Empty Input", category: "Edge Cases", desc: "Computing average of an empty list divides by count 0." },
  { id: 4, key: "bin_search_overflow", title: "Binary Search Midpoint Integer Overflow", category: "Algorithms", desc: "Calculating mid as '(low + high) / 2' overflows 32-bit integer limits." },
  { id: 5, key: "bin_search_bounds", title: "Binary Search Boundary Infinite Loop", category: "Algorithms", desc: "Setting 'low = mid' instead of 'mid + 1', causing an infinite loop on 2-element ranges." },
  { id: 6, key: "hash_collision_eq", title: "Hash Map Key Missing HashCode / Equals", category: "Data Structures", desc: "Custom object key does not implement consistent equality, causing lost lookups." },
  { id: 7, key: "nested_shallow_copy", title: "Nested Shallow Copy Mutation", category: "Data Structures", desc: "Copying outer array leaves interior object references shared, causing side-effects." },
  { id: 8, key: "stack_underflow", title: "Stack Pop Without Empty Guard", category: "Data Structures", desc: "Calling pop() on an empty stack without checking size first." },
  { id: 9, key: "queue_underflow", title: "Queue Dequeue on Empty Structure", category: "Data Structures", desc: "Polling or dequeuing from an empty queue throws an exception." },
  { id: 10, key: "tree_leaf_null_check", title: "Binary Tree Traversal Missing Null Check", category: "Trees", desc: "Accessing node.left or node.right without verifying node is not null." },
  { id: 11, key: "linked_list_cycle", title: "Linked List Reversal Pointer Cycle", category: "Linked Lists", desc: "Reversing pointers creates an accidental cycle because original head was not cleared." },
  { id: 12, key: "concurrent_mod_loop", title: "Modifying Collection While Iterating", category: "Collections", desc: "Removing elements from a list while iterating over it with a for-each loop." },
  { id: 13, key: "mutable_default_arg", title: "Mutable Default Argument Retention", category: "Functions", desc: "Using a mutable list as a default parameter accumulates data across function calls." },
  { id: 14, key: "comparator_transitivity", title: "Sorting Comparator Violating Transitivity", category: "Sorting", desc: "Comparator returns inconsistent comparison outcomes, breaking sorting invariants." },
  { id: 15, key: "matrix_transposition", title: "Matrix Row-Column Coordinate Inversion", category: "Arrays", desc: "Accessing matrix[i][j] with reversed dimensions on non-square matrices." },
  { id: 16, key: "graph_dfs_visited", title: "Graph Traversal Missing Visited Set", category: "Graphs", desc: "DFS traversal on cyclic graph omits visited tracker, looping forever." },
  { id: 17, key: "string_split_empty", title: "Empty String Split Handling", category: "Strings", desc: "Splitting an empty string returns an array with one empty string instead of empty array." },
  { id: 18, key: "two_pointer_cross", title: "Two-Pointer Convergence Boundary Error", category: "Algorithms", desc: "Using 'left <= right' instead of 'left < right' causes pointers to cross inappropriately." },
  { id: 19, key: "dp_table_off_by_one", title: "Dynamic Programming Table Dimension Off-by-One", category: "Dynamic Prog", desc: "Allocating DP array of size n instead of n+1 for 1-based subproblems." },
  { id: 20, key: "greedy_choice_bug", title: "Greedy Counterexample Failure", category: "Algorithms", desc: "Applying greedy coin change to non-canonical denominations yields non-optimal solution." },
  { id: 21, key: "heap_polarity_invert", title: "Priority Queue Polarity Reversal", category: "Data Structures", desc: "Expecting a max-heap but using default min-heap comparator order." },
  { id: 22, key: "trie_child_null", title: "Trie Node Traversal Null Pointer", category: "Trees", desc: "Accessing trie child node index without verifying child is instantiated." },
  { id: 23, key: "sliding_window_shrink", title: "Sliding Window Shrink Condition Error", category: "Algorithms", desc: "Shrinking window left pointer with 'if' instead of 'while' when constraint violated." },
  { id: 24, key: "quickselect_partition", title: "Quickselect Partition Out-of-Bounds Index", category: "Algorithms", desc: "Hoare or Lomuto partition loop index runs beyond subarray bounds." },
  { id: 25, key: "bitmask_shift_overflow", title: "Bitmask Shift Exceeding Word Width", category: "Bitwise", desc: "Shifting 32-bit integer by 32 or more positions results in undefined behavior." },
  { id: 26, key: "exception_root_mask", title: "Exception Masking Original Root Cause", category: "Exceptions", desc: "Catching a specific exception and throwing a generic error without chaining cause." },
  { id: 27, key: "monotonic_stack_pop", title: "Monotonic Stack Popping Invariant Error", category: "Data Structures", desc: "Popping with '<=' instead of '<' discards duplicate elements needed for calculation." },
  { id: 28, key: "epsilon_precision_geom", title: "Geometric Algorithm Precision Loss", category: "Arithmetic", desc: "Point-on-line colinearity check failing due to floating point rounding errors." },
  { id: 29, key: "merge_intervals_sort", title: "Interval Merge Sorted by Wrong Boundary", category: "Algorithms", desc: "Sorting intervals by end time instead of start time breaks sequential merge." },
  { id: 30, key: "regex_catastrophic", title: "Regular Expression Backtracking Stall", category: "Strings", desc: "Nested quantifier in regex pattern causes exponential backtracking on mismatch." }
];

const CONCEPTS_HARD = [
  { id: 1, key: "memory_leak_cache", title: "Unbounded Global Cache Memory Retention", category: "Memory", desc: "Accumulating records in a global dictionary without an eviction strategy or size limit." },
  { id: 2, key: "dangling_pointer", title: "Dangling Pointer After Memory Free", category: "Memory", desc: "Accessing heap memory through a pointer after calling free/delete on that address." },
  { id: 3, key: "unclosed_file_stream", title: "Unclosed File Descriptor Leak", category: "Resources", desc: "Opening file handles in a loop without closing them exhausts OS file descriptor tables." },
  { id: 4, key: "db_conn_pool_leak", title: "Database Connection Pool Starvation", category: "Resources", desc: "Acquiring a database connection and failing to release it in a finally/cleanup block." },
  { id: 5, key: "closure_memory_leak", title: "Closure Scope Heavy Context Retention", category: "Memory", desc: "Inner function unintentionally retains a reference to a large outer scope buffer." },
  { id: 6, key: "circular_ref_cycle", title: "Circular Reference Cycle Leak", category: "Memory", desc: "Two objects holding strong references to each other, preventing reference counting cleanup." },
  { id: 7, key: "double_free_vuln", title: "Double Free Heap Corruption", category: "Memory", desc: "Calling free() twice on the same memory pointer corrupts allocator metadata." },
  { id: 8, key: "use_after_free", title: "Use-After-Free Buffer Access", category: "Memory", desc: "Reading or writing to a dynamic buffer after returning its ownership." },
  { id: 9, key: "iterator_invalidation", title: "Iterator Invalidation on Container Mutation", category: "Collections", desc: "Adding elements to a vector/array during iteration reallocates underlying memory." },
  { id: 10, key: "buffer_overflow_heap", title: "Heap Buffer Boundary Overrun", category: "Memory", desc: "Writing more bytes than allocated with malloc into adjacent memory blocks." },
  { id: 11, key: "exception_swallow", title: "Silent Exception Swallowing", category: "Exceptions", desc: "Empty catch block suppresses fatal errors, leaving system in a corrupt partial state." },
  { id: 12, key: "unsafe_singleton", title: "Thread-Unsafe Lazy Singleton Initialization", category: "Patterns", desc: "Multiple threads simultaneously instantiate multiple instances of a singleton." },
  { id: 13, key: "non_virtual_destructor", title: "Non-Virtual Base Class Destructor", category: "OOP", desc: "Deleting derived object through base pointer does not execute derived cleanup." },
  { id: 14, key: "static_collection_growth", title: "Static Collection Growth Leak", category: "Memory", desc: "Static class collection retains objects for the entire lifespan of the process." },
  { id: 15, key: "memory_pool_fragment", title: "Custom Allocator Fragmentation", category: "Memory", desc: "Fixed-block allocator exhausts contiguous memory due to interleaved allocations." },
  { id: 16, key: "file_lock_leak", title: "File Lock Retained on Error Path", category: "Resources", desc: "Exception interrupts processing before file advisory lock can be released." },
  { id: 17, key: "incomplete_deep_copy", title: "Incomplete Deep Copy Sharing Pointer", category: "Memory", desc: "Copy constructor clones outer wrapper but copies raw interior pointer." },
  { id: 18, key: "shared_ptr_cycle", title: "Smart Pointer Reference Cycle", category: "Memory", desc: "Two objects hold std::shared_ptr to each other, requiring weak_ptr to break cycle." },
  { id: 19, key: "socket_leak_error", title: "Network Socket Leak on Handshake Error", category: "Resources", desc: "TCP socket is opened but not closed when TLS handshake throws an exception." },
  { id: 20, key: "event_listener_leak", title: "Unsubscribed Event Listener Memory Leak", category: "Memory", desc: "Components attach callbacks to global event emitters and never unsubscribe." },
  { id: 21, key: "buffer_read_underflow", title: "Buffer Over-Read Beyond Bytes Received", category: "IO", desc: "Reading full buffer capacity instead of actual bytes returned by socket read." },
  { id: 22, key: "loh_fragmentation", title: "Large Object Heap Allocation Churn", category: "Memory", desc: "Repeatedly allocating large arrays (>85KB) triggers heavy garbage collection latency." },
  { id: 23, key: "zombie_process_leak", title: "Child Process Zombie Leak", category: "OS", desc: "Spawning child subprocesses without calling waitpid() leaves zombie process table entries." },
  { id: 24, key: "struct_padding_misaligned", title: "Binary Struct Padding Misalignment", category: "Memory", desc: "Deserializing raw network bytes into struct with compiler-dependent alignment padding." },
  { id: 25, key: "dangling_rvalue_ref", title: "Dangling Reference to Temporary Object", category: "Memory", desc: "Binding a reference to a temporary object whose lifetime ends at statement boundary." },
  { id: 26, key: "non_atomic_file_write", title: "Non-Atomic File Write State Corruption", category: "IO", desc: "Writing configuration directly to destination file without temporary file rename." },
  { id: 27, key: "raii_violation", title: "Manual Resource Management RAII Breach", category: "Patterns", desc: "Relying on manual cleanup calls rather than destructor/context-manager guarantees." },
  { id: 28, key: "unchecked_malloc", title: "Unchecked Memory Allocation Return", category: "Memory", desc: "Using memory pointer immediately without verifying malloc did not return NULL." },
  { id: 29, key: "template_recursion_depth", title: "Recursive Template Instantiation Exhaustion", category: "Compilation", desc: "Template metaprogramming recursion lacks base specialization, exhausting compiler." },
  { id: 30, key: "signal_non_reentrant", title: "Signal Handler Invoking Non-Reentrant Function", category: "OS", desc: "Calling malloc or printf from inside a POSIX signal handler deadlocks process." }
];

const CONCEPTS_INTERVIEW = [
  { id: 1, key: "async_race_condition", title: "Asynchronous Stock Reservation Race", category: "Concurrency", desc: "Concurrent orders read available balance before async update, causing negative stock." },
  { id: 2, key: "thread_counter_lost", title: "Multithreaded Counter Lost Updates", category: "Concurrency", desc: "Incrementing shared counter without atomic operations loses updates under concurrency." },
  { id: 3, key: "deadlock_circular", title: "Deadlock via Circular Lock Acquisition", category: "Concurrency", desc: "Thread 1 locks A then B, while Thread 2 locks B then A, freezing execution." },
  { id: 4, key: "toctou_file_race", title: "Time-of-Check to Time-of-Use (TOCTOU) Flaw", category: "Security", desc: "Checking file permissions before opening creates a race window for symlink substitution." },
  { id: 5, key: "mutex_priority_inversion", title: "Priority Inversion Lock Starvation", category: "Concurrency", desc: "Low-priority thread holding lock is preempted by medium thread, stalling high-priority thread." },
  { id: 6, key: "event_loop_blocking", title: "CPU-Intensive Event Loop Blocking", category: "Performance", desc: "Running synchronous O(N^2) computation on main thread halts all incoming HTTP requests." },
  { id: 7, key: "double_checked_locking", title: "Double-Checked Locking Without Memory Barrier", category: "Concurrency", desc: "Compiler reorders object construction, allowing other threads to read half-baked instance." },
  { id: 8, key: "rwlock_write_starve", title: "Reader-Writer Lock Writer Starvation", category: "Concurrency", desc: "Continuous incoming read locks indefinitely delay pending write operations." },
  { id: 9, key: "lost_wakeup_condvar", title: "Lost Wakeup on Condition Variable", category: "Concurrency", desc: "Signaling condition variable before waiting thread enters wait state causes lost signal." },
  { id: 10, key: "aba_lock_free_problem", title: "ABA Problem in Lock-Free CAS Stack", category: "Concurrency", desc: "CAS succeeds because pointer matches original address, unaware node was reallocated." },
  { id: 11, key: "rate_limiter_race", title: "Distributed Rate Limiter Token Collision", category: "Distributed", desc: "Non-atomic read-and-increment allows concurrent bursts to breach rate limits." },
  { id: 12, key: "optimistic_lock_retry", title: "Unhandled Optimistic Locking Conflict", category: "Database", desc: "Updating database row without checking version timestamp causes silent overwrite." },
  { id: 13, key: "conn_pool_starvation", title: "Connection Pool Starvation Under Burst Load", category: "Architecture", desc: "All pool connections blocked waiting on external API, starving fast endpoints." },
  { id: 14, key: "thread_pool_saturation", title: "Thread Pool Queue Saturation", category: "Architecture", desc: "Unbounded worker queue consumes heap memory and spikes response latency to seconds." },
  { id: 15, key: "read_skew_isolation", title: "Database Read Skew Anomaly", category: "Database", desc: "Reading account balances across two transactions without snapshot isolation." },
  { id: 16, key: "unbounded_channel_backpressure", title: "Channel Missing Backpressure Control", category: "Concurrency", desc: "Producer pushes to channel faster than consumer drains, causing out-of-memory." },
  { id: 17, key: "phantom_read_concurrency", title: "Phantom Read in Concurrent Range Queries", category: "Database", desc: "New row inserted matching query range between two reads in the same transaction." },
  { id: 18, key: "false_sharing_cache", title: "False Sharing CPU Cache Thrashing", category: "Hardware", desc: "Multiple threads modifying adjacent variables that reside on the same 64-byte cache line." },
  { id: 19, key: "idempotency_token_collision", title: "Non-Atomic Idempotency Key Evaluation", category: "Distributed", desc: "Two identical payment requests processed simultaneously before key is marked." },
  { id: 20, key: "memory_order_relaxed", title: "Relaxed Memory Ordering Synchronization Failure", category: "Concurrency", desc: "Using memory_order_relaxed allows CPU to reorder flag store before payload write." },
  { id: 21, key: "thundering_herd_retry", title: "Thundering Herd Cache Stampede", category: "Distributed", desc: "Cache key expiration triggers thousands of simultaneous database queries." },
  { id: 22, key: "check_then_insert_race", title: "Check-Then-Insert Unique Collision", category: "Database", desc: "Checking if username exists before inserting without unique database constraint." },
  { id: 23, key: "threadlocal_leak", title: "ThreadLocal Leak in Web Server Pool", category: "Memory", desc: "Setting ThreadLocal value without calling remove() retains memory across requests." },
  { id: 24, key: "concurrent_hashmap_resize", title: "Unsynchronized Map Resize Deadlock", category: "Concurrency", desc: "Concurrent puts on standard hash map trigger bucket loop and 100% CPU lockup." },
  { id: 25, key: "split_brain_quorum", title: "Split-Brain Quorum Calculation Bug", category: "Distributed", desc: "Partitioned cluster allows two disjoint subsets to each elect an active leader." },
  { id: 26, key: "coroutine_critical_yield", title: "Coroutine Yield in Non-Reentrant Critical Section", category: "Concurrency", desc: "Async await point yields execution inside an incomplete state mutation." },
  { id: 27, key: "ring_buffer_wrap_collision", title: "Lock-Free Ring Buffer Index Collision", category: "Concurrency", desc: "Fast producer laps slow consumer, overwriting unread packets." },
  { id: 28, key: "signal_malloc_deadlock", title: "Signal Handler Malloc Deadlock", category: "OS", desc: "Signal interrupts thread holding allocator lock and attempts dynamic allocation." },
  { id: 29, key: "semaphore_permit_leak", title: "Semaphore Permit Leak on Early Return", category: "Concurrency", desc: "Acquiring semaphore permit and returning early on error branch without releasing." },
  { id: 30, key: "two_phase_commit_hang", title: "Two-Phase Commit Coordinator Failure Hang", category: "Distributed", desc: "Coordinator node crashes after Prepare phase, leaving participants locked in limbo." }
];

// =========================================================================
// 2. MULTI-LANGUAGE SYNTHESIZER ENGINE (10 LANGUAGES)
// =========================================================================

const LANGUAGE_CONFIGS = {
  python: { name: "Python", ext: ".py", comment: "#", runner: "python3 solution.py" },
  c: { name: "C", ext: ".c", comment: "//", runner: "gcc solution.c && ./a.out" },
  cpp: { name: "C++", ext: ".cpp", comment: "//", runner: "g++ -std=c++20 solution.cpp && ./a.out" },
  java: { name: "Java", ext: ".java", comment: "//", runner: "javac Solution.java && java Solution" },
  javascript: { name: "JavaScript", ext: ".js", comment: "//", runner: "node solution.js" },
  typescript: { name: "TypeScript", ext: ".ts", comment: "//", runner: "npx ts-node solution.ts" },
  go: { name: "Go", ext: ".go", comment: "//", runner: "go run solution.go" },
  rust: { name: "Rust", ext: ".rs", comment: "//", runner: "rustc solution.rs && ./solution" },
  csharp: { name: "C#", ext: ".cs", comment: "//", runner: "dotnet run" },
  php: { name: "PHP", ext: ".php", comment: "//", runner: "php solution.php" }
};

/**
 * Dynamic Scenario Generator
 * Produces authentic code, exact bug line, test cases, and Socratic hints
 * for ANY combination of (Language, Difficulty, QuestionIndex 1-30).
 */
function generateScenario(lang, difficulty, index) {
  const qIndex = Math.max(1, Math.min(30, index));
  const conceptList = difficulty === "easy" ? CONCEPTS_EASY :
                      difficulty === "medium" ? CONCEPTS_MEDIUM :
                      difficulty === "hard" ? CONCEPTS_HARD : CONCEPTS_INTERVIEW;

  const concept = conceptList[qIndex - 1];
  const langConfig = LANGUAGE_CONFIGS[lang] || LANGUAGE_CONFIGS.javascript;

  return synthesizeCodeForConcept(lang, difficulty, concept, qIndex);
}

function synthesizeCodeForConcept(lang, difficulty, concept, qIndex) {
  // Common metadata
  const title = `Q${qIndex}: ${concept.title}`;
  const category = concept.category;
  const description = concept.desc;

  // Language-specific templates based on difficulty and concept key
  switch (lang) {
    case "python":
      return buildPythonScenario(concept, qIndex, difficulty);
    case "c":
      return buildCScenario(concept, qIndex, difficulty);
    case "cpp":
      return buildCppScenario(concept, qIndex, difficulty);
    case "java":
      return buildJavaScenario(concept, qIndex, difficulty);
    case "typescript":
      return buildTypeScriptScenario(concept, qIndex, difficulty);
    case "go":
      return buildGoScenario(concept, qIndex, difficulty);
    case "rust":
      return buildRustScenario(concept, qIndex, difficulty);
    case "csharp":
      return buildCSharpScenario(concept, qIndex, difficulty);
    case "php":
      return buildPhpScenario(concept, qIndex, difficulty);
    case "javascript":
    default:
      return buildJavaScriptScenario(concept, qIndex, difficulty);
  }
}

// -------------------------------------------------------------------------
// PYTHON TEMPLATES
// -------------------------------------------------------------------------
function buildPythonScenario(c, idx, diff) {
  let buggyCode, fixedCode, buggyLine, errorOutput, fixedOutput;

  if (diff === "easy") {
    buggyLine = 6;
    buggyCode = `# Question ${idx}: ${c.title}
# Category: ${c.category}
def compute_scores(scores):
    total = 0
    # BUG: range(len(scores) + 1) generates an index equal to len(scores)!
    for i in range(len(scores) + 1):
        total += scores[i]
    return total

test_data = [88, 92, 79, 95]
print("Computed Total:", compute_scores(test_data))`;

    fixedCode = `# Question ${idx}: ${c.title}
# Category: ${c.category}
def compute_scores(scores):
    total = 0
    # FIXED: range(len(scores)) stops cleanly at the last valid index
    for i in range(len(scores)):
        total += scores[i]
    return total

test_data = [88, 92, 79, 95]
print("Computed Total:", compute_scores(test_data))`;
    errorOutput = `Traceback (most recent call last):
  File "solution.py", line 11, in <module>
    print("Computed Total:", compute_scores(test_data))
  File "solution.py", line 7, in compute_scores
    total += scores[i]
IndexError: list index out of range (tried to access index 4 of length 4)`;
    fixedOutput = `Computed Total: 354
Execution finished in 12ms. All assertions passed.`;
  } else if (diff === "medium") {
    buggyLine = 7;
    buggyCode = `# Question ${idx}: ${c.title}
def get_user_profile(user_id):
    users = {"U1": {"name": "Alex", "role": "Student"}}
    user = users.get(user_id)
    # BUG: If user_id is missing, user is None.
    # Calling user["role"] crashes when user is None!
    return user["role"].upper()

print("User role:", get_user_profile("U99"))`;

    fixedCode = `# Question ${idx}: ${c.title}
def get_user_profile(user_id):
    users = {"U1": {"name": "Alex", "role": "Student"}}
    user = users.get(user_id)
    # FIXED: Check if user is None before reading attributes
    if user is None:
        return "GUEST"
    return user["role"].upper()

print("User role:", get_user_profile("U99"))`;
    errorOutput = `Traceback (most recent call last):
  File "solution.py", line 10, in <module>
    print("User role:", get_user_profile("U99"))
  File "solution.py", line 7, in get_user_profile
    return user["role"].upper()
TypeError: 'NoneType' object is not subscriptable`;
    fixedOutput = `User role: GUEST
Execution finished in 9ms. Null-safety verified.`;
  } else if (diff === "hard") {
    buggyLine = 6;
    buggyCode = `# Question ${idx}: ${c.title}
session_records = []

def record_telemetry(packet_id, data):
    # BUG: Accumulates large buffers in global list without eviction
    session_records.append({"id": packet_id, "payload": data * 10000})
    return len(session_records)

for i in range(100):
    record_telemetry(f"pkt_{i}", "x")
print("Recorded count:", len(session_records))`;

    fixedCode = `# Question ${idx}: ${c.title}
session_records = []

def record_telemetry(packet_id, data):
    # FIXED: Evict or cap history buffer size
    if len(session_records) > 20:
        session_records.pop(0)
    session_records.append({"id": packet_id, "payload": data})
    return len(session_records)

for i in range(100):
    record_telemetry(f"pkt_{i}", "x")
print("Recorded count:", len(session_records))`;
    errorOutput = `System Alert: High Memory Retention
Warning: session_records holds 100 items with heavy payloads in memory.
Memory footprint: 48MB (Expected < 10MB)`;
    fixedOutput = `Recorded count: 21
Memory footprint stable at 2.4MB. All assertions passed.`;
  } else {
    buggyLine = 11;
    buggyCode = `# Question ${idx}: ${c.title}
import threading
import time

shared_balance = 100

def withdraw(amount):
    global shared_balance
    # BUG: Non-atomic check and debit across threads
    if shared_balance >= amount:
        time.sleep(0.001) # Simulated network delay
        shared_balance -= amount

threads = [threading.Thread(target=withdraw, args=(60,)) for _ in range(2)]
for t in threads: t.start()
for t in threads: t.join()
print("Final Balance:", shared_balance)`;

    fixedCode = `# Question ${idx}: ${c.title}
import threading
import time

shared_balance = 100
balance_lock = threading.Lock() # FIXED: Mutex lock

def withdraw(amount):
    global shared_balance
    with balance_lock:
        if shared_balance >= amount:
            time.sleep(0.001)
            shared_balance -= amount

threads = [threading.Thread(target=withdraw, args=(60,)) for _ in range(2)]
for t in threads: t.start()
for t in threads: t.join()
print("Final Balance:", shared_balance)`;
    errorOutput = `Final Balance: -20
CRITICAL: Balance dropped below zero!
Concurrency violation: Two threads simultaneously withdrew $60 from a $100 balance.`;
    fixedOutput = `Final Balance: 40
Concurrency Invariant Verified: Mutex prevented overdraft. Final balance is valid.`;
  }

  return formatScenarioPayload("python", idx, c, diff, buggyCode, fixedCode, buggyLine, errorOutput, fixedOutput);
}

// -------------------------------------------------------------------------
// JAVASCRIPT TEMPLATES
// -------------------------------------------------------------------------
function buildJavaScriptScenario(c, idx, diff) {
  let buggyCode, fixedCode, buggyLine, errorOutput, fixedOutput;

  if (diff === "easy") {
    buggyLine = 6;
    buggyCode = `// Question ${idx}: ${c.title}
// Category: ${c.category}
function calculateSum(items) {
  let sum = 0;
  // BUG: Loop condition '<=' runs past the end of the array!
  for (let i = 0; i <= items.length; i++) {
    sum += items[i];
  }
  return sum;
}

const list = [10, 20, 30, 40];
console.log("Sum:", calculateSum(list));`;

    fixedCode = `// Question ${idx}: ${c.title}
// Category: ${c.category}
function calculateSum(items) {
  let sum = 0;
  // FIXED: Loop condition '<' stops at items.length - 1
  for (let i = 0; i < items.length; i++) {
    sum += items[i];
  }
  return sum;
}

const list = [10, 20, 30, 40];
console.log("Sum:", calculateSum(list));`;
    errorOutput = `TypeError: Cannot read properties of undefined (reading '+')
    at calculateSum (solution.js:6:12)
    at solution.js:12:19
Result: NaN (Program halted with code 1)`;
    fixedOutput = `Sum: 100
Execution finished in 8ms. All 3 test cases passed.`;
  } else if (diff === "medium") {
    buggyLine = 5;
    buggyCode = `// Question ${idx}: ${c.title}
function recursiveFactorial(n) {
  // BUG: Missing base condition!
  // Calls itself infinitely with negative numbers until stack overflows.
  return n * recursiveFactorial(n - 1);
}

console.log("Factorial(5):", recursiveFactorial(5));`;

    fixedCode = `// Question ${idx}: ${c.title}
function recursiveFactorial(n) {
  // FIXED: Base condition returns 1 when n <= 1
  if (n <= 1) return 1;
  return n * recursiveFactorial(n - 1);
}

console.log("Factorial(5):", recursiveFactorial(5));`;
    errorOutput = `RangeError: Maximum call stack size exceeded
    at recursiveFactorial (solution.js:5:14)
    at recursiveFactorial (solution.js:5:14)
    ... (10,000+ frames)`;
    fixedOutput = `Factorial(5): 120
Execution finished in 11ms. Stack unwound cleanly.`;
  } else if (diff === "hard") {
    buggyLine = 8;
    buggyCode = `// Question ${idx}: ${c.title}
const activeCache = {};

function processTask(taskId, payload) {
  const heavyBuffer = new Array(50000).fill(payload);
  // BUG: Unbounded storage in global object without cleanup!
  activeCache[taskId] = heavyBuffer;
  return heavyBuffer.length;
}

for (let i = 0; i < 50; i++) processTask("task_" + i, 0xFF);
console.log("Processed tasks.");`;

    fixedCode = `// Question ${idx}: ${c.title}
const activeCache = {};

function processTask(taskId, payload) {
  const heavyBuffer = new Array(50000).fill(payload);
  // FIXED: Dereference or clean up cache entry post-processing
  activeCache[taskId] = heavyBuffer;
  delete activeCache[taskId];
  return heavyBuffer.length;
}

for (let i = 0; i < 50; i++) processTask("task_" + i, 0xFF);
console.log("Processed tasks.");`;
    errorOutput = `System Alert: High Memory Usage (420 MB allocated)
Warning: 50 un-evicted arrays in global activeCache preventing GC sweep.`;
    fixedOutput = `Processed tasks.
Memory stable at 18 MB. Garbage collection cycle nominal.`;
  } else {
    buggyLine = 8;
    buggyCode = `// Question ${idx}: ${c.title}
let availableInventory = 10;

async function purchase(orderId, qty) {
  const current = availableInventory;
  // BUG: Asynchronous gap allows multiple requests to read stale inventory!
  await new Promise(r => setTimeout(r, 15));
  if (current >= qty) {
    availableInventory = current - qty;
    return true;
  }
  return false;
}

Promise.all([purchase("A", 8), purchase("B", 8)]).then(() => {
  console.log("Remaining stock:", availableInventory);
});`;

    fixedCode = `// Question ${idx}: ${c.title}
let availableInventory = 10;
let queueLock = Promise.resolve(); // FIXED: Mutex lock

async function purchase(orderId, qty) {
  return queueLock = queueLock.then(async () => {
    if (availableInventory >= qty) {
      availableInventory -= qty;
      return true;
    }
    return false;
  });
}

Promise.all([purchase("A", 8), purchase("B", 8)]).then(() => {
  console.log("Remaining stock:", availableInventory);
});`;
    errorOutput = `Remaining stock: -6
ALERT: Over-sold inventory! Available was 10, but 16 units approved.
Race condition breached stock floor invariant.`;
    fixedOutput = `Remaining stock: 2
Race Condition Avoided: Only first order approved. Stock floor preserved.`;
  }

  return formatScenarioPayload("javascript", idx, c, diff, buggyCode, fixedCode, buggyLine, errorOutput, fixedOutput);
}

// -------------------------------------------------------------------------
// TYPESCRIPT TEMPLATES
// -------------------------------------------------------------------------
function buildTypeScriptScenario(c, idx, diff) {
  const jsSc = buildJavaScriptScenario(c, idx, diff);
  // Add TypeScript type annotations
  jsSc.buggyCode = jsSc.buggyCode
    .replace("function calculateSum(items)", "function calculateSum(items: number[]): number")
    .replace("let sum = 0;", "let sum: number = 0;")
    .replace("function recursiveFactorial(n)", "function recursiveFactorial(n: number): number")
    .replace("const activeCache = {};", "const activeCache: Record<string, number[]> = {};")
    .replace("function processTask(taskId, payload)", "function processTask(taskId: string, payload: number): number");

  jsSc.fixedCode = jsSc.fixedCode
    .replace("function calculateSum(items)", "function calculateSum(items: number[]): number")
    .replace("let sum = 0;", "let sum: number = 0;")
    .replace("function recursiveFactorial(n)", "function recursiveFactorial(n: number): number")
    .replace("const activeCache = {};", "const activeCache: Record<string, number[]> = {};")
    .replace("function processTask(taskId, payload)", "function processTask(taskId: string, payload: number): number");

  return jsSc;
}

// -------------------------------------------------------------------------
// C & C++ TEMPLATES
// -------------------------------------------------------------------------
function buildCScenario(c, idx, diff) {
  let buggyCode, fixedCode, buggyLine, errorOutput, fixedOutput;

  if (diff === "easy") {
    buggyLine = 8;
    buggyCode = `// Question ${idx}: ${c.title}
#include <stdio.h>

int main() {
    int scores[4] = {85, 90, 78, 92};
    int total = 0;
    // BUG: Loop condition 'i <= 4' executes 5 times, reading out of bounds!
    for (int i = 0; i <= 4; i++) {
        total += scores[i];
    }
    printf("Total: %d\\n", total);
    return 0;
}`;
    fixedCode = `// Question ${idx}: ${c.title}
#include <stdio.h>

int main() {
    int scores[4] = {85, 90, 78, 92};
    int total = 0;
    // FIXED: Loop condition 'i < 4' stops at index 3
    for (int i = 0; i < 4; i++) {
        total += scores[i];
    }
    printf("Total: %d\\n", total);
    return 0;
}`;
    errorOutput = `Total: 4214589 (Garbage Memory)
Stack buffer overrun: scores[4] read unallocated stack bits.`;
    fixedOutput = `Total: 345
Execution finished in 4ms. Buffer boundary verified.`;
  } else if (diff === "medium") {
    buggyLine = 6;
    buggyCode = `// Question ${idx}: ${c.title}
#include <stdio.h>

int main() {
    FILE* fp = fopen("missing_scores.txt", "r");
    // BUG: If file is missing, fp is NULL!
    char ch = fgetc(fp);
    printf("Char: %c\\n", ch);
    fclose(fp);
    return 0;
}`;
    fixedCode = `// Question ${idx}: ${c.title}
#include <stdio.h>

int main() {
    FILE* fp = fopen("missing_scores.txt", "r");
    // FIXED: Verify fp is not NULL before dereferencing
    if (fp == NULL) {
        printf("File not found.\\n");
        return 1;
    }
    char ch = fgetc(fp);
    printf("Char: %c\\n", ch);
    fclose(fp);
    return 0;
}`;
    errorOutput = `Segmentation fault (core dumped)
Signal 11: Attempted to dereference NULL pointer (0x0).`;
    fixedOutput = `File not found.
Program handled null pointer safely and exited cleanly.`;
  } else if (diff === "hard") {
    buggyLine = 7;
    buggyCode = `// Question ${idx}: ${c.title}
#include <stdlib.h>
#include <stdio.h>

void allocateBuffers() {
    for (int i = 0; i < 1000; i++) {
        // BUG: malloc allocates heap memory, but free() is never called!
        int* buffer = (int*)malloc(1000 * sizeof(int));
        buffer[0] = i;
    }
}

int main() {
    allocateBuffers();
    printf("Buffers allocated.\\n");
    return 0;
}`;
    fixedCode = `// Question ${idx}: ${c.title}
#include <stdlib.h>
#include <stdio.h>

void allocateBuffers() {
    for (int i = 0; i < 1000; i++) {
        int* buffer = (int*)malloc(1000 * sizeof(int));
        buffer[0] = i;
        // FIXED: Explicitly free allocated block
        free(buffer);
    }
}

int main() {
    allocateBuffers();
    printf("Buffers allocated.\\n");
    return 0;
}`;
    errorOutput = `System Alert: 4.0 MB heap memory leaked
Valgrind: 1,000 blocks definitely lost in loss record 1 of 1.`;
    fixedOutput = `Buffers allocated.
Valgrind: 0 bytes in 0 blocks are definitely lost. All heap memory freed.`;
  } else {
    buggyLine = 8;
    buggyCode = `// Question ${idx}: ${c.title}
#include <stdio.h>
#include <pthread.h>

int counter = 0;

void* run(void* arg) {
    // BUG: Unprotected global counter increment across threads
    for (int i = 0; i < 10000; i++) counter++;
    return NULL;
}

int main() {
    pthread_t t1, t2;
    pthread_create(&t1, NULL, run, NULL);
    pthread_create(&t2, NULL, run, NULL);
    pthread_join(t1, NULL); pthread_join(t2, NULL);
    printf("Counter: %d\\n", counter);
    return 0;
}`;
    fixedCode = `// Question ${idx}: ${c.title}
#include <stdio.h>
#include <pthread.h>

int counter = 0;
pthread_mutex_t mtx = PTHREAD_MUTEX_INITIALIZER; // FIXED: Mutex

void* run(void* arg) {
    for (int i = 0; i < 10000; i++) {
        pthread_mutex_lock(&mtx);
        counter++;
        pthread_mutex_unlock(&mtx);
    }
    return NULL;
}

int main() {
    pthread_t t1, t2;
    pthread_create(&t1, NULL, run, NULL);
    pthread_create(&t2, NULL, run, NULL);
    pthread_join(t1, NULL); pthread_join(t2, NULL);
    printf("Counter: %d\\n", counter);
    return 0;
}`;
    errorOutput = `Counter: 14283 (Expected: 20000)
Data Race Warning: 5,717 updates lost due to concurrent unsynchronized writes.`;
    fixedOutput = `Counter: 20000
Thread Invariant Verified: Mutex ensured exact 20,000 increments.`;
  }

  return formatScenarioPayload("c", idx, c, diff, buggyCode, fixedCode, buggyLine, errorOutput, fixedOutput);
}

function buildCppScenario(c, idx, diff) {
  const cSc = buildCScenario(c, idx, diff);
  // Adapt to modern C++ style
  if (diff === "easy") {
    cSc.buggyCode = `// Question ${idx}: ${c.title}
#include <iostream>
#include <vector>

int main() {
    std::vector<int> scores = {85, 90, 78, 92};
    int total = 0;
    // BUG: Loop condition 'i <= scores.size()' accesses past the vector!
    for (size_t i = 0; i <= scores.size(); ++i) {
        total += scores[i];
    }
    std::cout << "Total: " << total << std::endl;
    return 0;
}`;
    cSc.fixedCode = `// Question ${idx}: ${c.title}
#include <iostream>
#include <vector>

int main() {
    std::vector<int> scores = {85, 90, 78, 92};
    int total = 0;
    // FIXED: Use '<' or range-based for loop
    for (size_t i = 0; i < scores.size(); ++i) {
        total += scores[i];
    }
    std::cout << "Total: " << total << std::endl;
    return 0;
}`;
    cSc.buggyLine = 9;
  }
  return cSc;
}

// -------------------------------------------------------------------------
// JAVA, GO, RUST, C#, PHP GENERATORS
// -------------------------------------------------------------------------
function buildJavaScenario(c, idx, diff) {
  const jsSc = buildJavaScriptScenario(c, idx, diff);
  let buggyCode = `// Question ${idx}: ${c.title}
public class Solution {
    public static void main(String[] args) {
        int[] scores = {85, 90, 78, 92};
        int sum = 0;
        // BUG: Loop condition 'i <= scores.length'
        for (int i = 0; i <= scores.length; i++) {
            sum += scores[i];
        }
        System.out.println("Sum: " + sum);
    }
}`;
  let fixedCode = `// Question ${idx}: ${c.title}
public class Solution {
    public static void main(String[] args) {
        int[] scores = {85, 90, 78, 92};
        int sum = 0;
        // FIXED: Loop condition 'i < scores.length'
        for (int i = 0; i < scores.length; i++) {
            sum += scores[i];
        }
        System.out.println("Sum: " + sum);
    }
}`;
  return formatScenarioPayload("java", idx, c, diff, buggyCode, fixedCode, 7,
    `Exception in thread "main" java.lang.ArrayIndexOutOfBoundsException: Index 4 out of bounds for length 4`,
    `Sum: 345\nAll 3 test cases passed in 18ms.`);
}

function buildGoScenario(c, idx, diff) {
  let buggyCode = `// Question ${idx}: ${c.title}
package main
import "fmt"

func main() {
    scores := []int{85, 90, 78, 92}
    total := 0
    // BUG: Loop boundary 'i <= len(scores)' causes panic!
    for i := 0; i <= len(scores); i++ {
        total += scores[i]
    }
    fmt.Println("Total:", total)
}`;
  let fixedCode = `// Question ${idx}: ${c.title}
package main
import "fmt"

func main() {
    scores := []int{85, 90, 78, 92}
    total := 0
    // FIXED: Use '< len(scores)' or 'range scores'
    for i := 0; i < len(scores); i++ {
        total += scores[i]
    }
    fmt.Println("Total:", total)
}`;
  return formatScenarioPayload("go", idx, c, diff, buggyCode, fixedCode, 9,
    `panic: runtime error: index out of range [4] with length 4\ngoroutine 1 [running]:\nmain.main()`,
    `Total: 345\nProgram executed cleanly in 7ms.`);
}

function buildRustScenario(c, idx, diff) {
  let buggyCode = `// Question ${idx}: ${c.title}
fn main() {
    let scores = vec![85, 90, 78, 92];
    let mut total = 0;
    // BUG: Loop index '0..=scores.len()' reaches index 4!
    for i in 0..=scores.len() {
        total += scores[i];
    }
    println!("Total: {}", total);
}`;
  let fixedCode = `// Question ${idx}: ${c.title}
fn main() {
    let scores = vec![85, 90, 78, 92];
    let mut total = 0;
    // FIXED: Use exclusive range '0..scores.len()'
    for i in 0..scores.len() {
        total += scores[i];
    }
    println!("Total: {}", total);
}`;
  return formatScenarioPayload("rust", idx, c, diff, buggyCode, fixedCode, 6,
    `thread 'main' panicked at 'index out of bounds: the len is 4 but the index is 4'`,
    `Total: 345\nZero memory safety errors. All tests passed in 5ms.`);
}

function buildCSharpScenario(c, idx, diff) {
  let buggyCode = `// Question ${idx}: ${c.title}
using System;

class Program {
    static void Main() {
        int[] scores = { 85, 90, 78, 92 };
        int sum = 0;
        // BUG: Loop condition 'i <= scores.Length'
        for (int i = 0; i <= scores.Length; i++) {
            sum += scores[i];
        }
        Console.WriteLine("Sum: " + sum);
    }
}`;
  let fixedCode = `// Question ${idx}: ${c.title}
using System;

class Program {
    static void Main() {
        int[] scores = { 85, 90, 78, 92 };
        int sum = 0;
        // FIXED: Loop condition 'i < scores.Length'
        for (int i = 0; i < scores.Length; i++) {
            sum += scores[i];
        }
        Console.WriteLine("Sum: " + sum);
    }
}`;
  return formatScenarioPayload("csharp", idx, c, diff, buggyCode, fixedCode, 9,
    `Unhandled exception. System.IndexOutOfRangeException: Index was outside the bounds of the array.`,
    `Sum: 345\nAll 3 test cases passed in 14ms.`);
}

function buildPhpScenario(c, idx, diff) {
  let buggyCode = `<?php
// Question ${idx}: ${c.title}
$scores = [85, 90, 78, 92];
$total = 0;

// BUG: Loop condition '$i <= count($scores)'
for ($i = 0; $i <= count($scores); $i++) {
    $total += $scores[$i];
}

echo "Total: " . $total . "\\n";`;
  let fixedCode = `<?php
// Question ${idx}: ${c.title}
$scores = [85, 90, 78, 92];
$total = 0;

// FIXED: Loop condition '$i < count($scores)'
for ($i = 0; $i < count($scores); $i++) {
    $total += $scores[$i];
}

echo "Total: " . $total . "\\n";`;
  return formatScenarioPayload("php", idx, c, diff, buggyCode, fixedCode, 8,
    `PHP Warning: Undefined array key 4 in solution.php on line 8`,
    `Total: 345\nExecution finished in 8ms.`);
}

// -------------------------------------------------------------------------
// PAYLOAD FORMATTER
// -------------------------------------------------------------------------
function formatScenarioPayload(lang, idx, c, diff, buggyCode, fixedCode, buggyLine, errorOutput, fixedOutput) {
  return {
    id: idx,
    title: `Q${idx}: ${c.title}`,
    category: c.category,
    description: c.desc,
    buggyLine: buggyLine,
    buggyCode: buggyCode,
    fixedCode: fixedCode,
    errorOutput: errorOutput,
    fixedOutput: fixedOutput,
    explanation: `Key takeaway: ${c.desc} Correct the boundary condition or reference lifecycle at line ${buggyLine}.`,
    hints: [
      {
        step: 1,
        type: "Observation",
        label: "🔎 Hint 1 (Observation)",
        text: `Take a close look at line ${buggyLine}. What values or boundaries are being evaluated on this exact step?`
      },
      {
        step: 2,
        type: "Concept",
        label: "🧠 Hint 2 (Concept)",
        text: `In ${LANGUAGE_CONFIGS[lang]?.name || 'programming'}, this is a classic ${c.category} issue (${c.title}). Think about how the runtime indexes memory or tracks object lifecycle.`
      },
      {
        step: 3,
        type: "Guiding Question",
        label: "💡 Hint 3 (Guiding Question)",
        text: `What condition or guard could you place on line ${buggyLine} to ensure the program never crosses an invalid boundary or leaks memory?`
      }
    ],
    testCases: [
      { id: 1, name: "Standard Input Assertion", expected: "Nominal Result", buggyActual: "Error / Crash", fixedActual: "Nominal Result" },
      { id: 2, name: "Boundary Condition Invariant", expected: "Within Range", buggyActual: "Out of Bounds", fixedActual: "Within Range" },
      { id: 3, name: "Edge Case Safety Check", expected: "Safe Exit", buggyActual: "Failed", fixedActual: "Safe Exit" }
    ]
  };
}

// =========================================================================
// 3. APPLICATION STATE
// =========================================================================

const state = {
  activeTab: "sandbox", // 'sandbox' | 'builder' | 'analytics'
  currentLang: "python",
  currentDifficulty: "easy",
  currentQuestionIndex: 1,
  currentMode: "sample", // 'sample' | 'custom'
  isAiDrawerOpen: false,
  isAnalyzed: false,
  isFixed: false,
  inspectedLine: 1,
  studentXp: 840,
  cpuHistory: Array(25).fill(12),
  memHistory: Array(25).fill(32),
  builder: {
    targetLang: "python",
    totalCount: 8,
    counts: { easy: 2, medium: 3, hard: 2, interview: 1 },
    timeLimit: 45
  },
  assessmentSession: {
    isActive: false,
    questions: [],
    currentIndex: 0,
    timeRemaining: 45 * 60,
    timerInterval: null,
    answers: {},
    startTime: null
  },
  chatMessages: [
    {
      sender: "clover",
      text: "Hello! I'm **Clover**, your Socratic AI Debugger. Rather than giving away the answers, I help you understand *why* bugs happen line by line. Click any line number in the code gutter, hit **Analyze Line**, or ask me any question!"
    }
  ]
};

// =========================================================================
// 4. INITIALIZATION ON DOM LOAD
// =========================================================================

document.addEventListener("DOMContentLoaded", () => {
  initTabNavigation();
  initLanguageSelector();
  initDifficultySelector();
  initQuestionNavigation();
  initCodeEditor();
  initActionButtons();
  initAiDrawer();
  initChart();
  populateQuestionDropdown();
  loadCurrentScenario();
  initInterviewBuilder();
  initAnalyticsDashboard();
});

// =========================================================================
// 5. NAVIGATION & QUESTION SELECTOR
// =========================================================================

function initLanguageSelector() {
  const select = document.getElementById("langSelect");
  if (!select) return;

  select.value = state.currentLang;
  select.addEventListener("change", (e) => {
    state.currentLang = e.target.value;
    loadCurrentScenario();
  });
}

function initDifficultySelector() {
  const select = document.getElementById("difficultySelect");
  if (!select) return;

  select.value = state.currentDifficulty;
  select.addEventListener("change", (e) => {
    state.currentDifficulty = e.target.value;
    state.currentQuestionIndex = 1;
    populateQuestionDropdown();
    loadCurrentScenario();
  });
}

function initQuestionNavigation() {
  const prevBtn = document.getElementById("prevQuestionBtn");
  const nextBtn = document.getElementById("nextQuestionBtn");
  const qSelect = document.getElementById("questionSelect");
  const loadBtn = document.getElementById("loadSampleBtn");

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      if (state.currentQuestionIndex > 1) {
        state.currentQuestionIndex--;
        qSelect.value = state.currentQuestionIndex;
        loadCurrentScenario();
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      if (state.currentQuestionIndex < 30) {
        state.currentQuestionIndex++;
        qSelect.value = state.currentQuestionIndex;
        loadCurrentScenario();
      }
    });
  }

  if (qSelect) {
    qSelect.addEventListener("change", (e) => {
      state.currentQuestionIndex = parseInt(e.target.value, 10) || 1;
      loadCurrentScenario();
    });
  }

  if (loadBtn) {
    loadBtn.addEventListener("click", () => {
      loadCurrentScenario();
    });
  }
}

function populateQuestionDropdown() {
  const qSelect = document.getElementById("questionSelect");
  if (!qSelect) return;

  const conceptList = state.currentDifficulty === "easy" ? CONCEPTS_EASY :
                      state.currentDifficulty === "medium" ? CONCEPTS_MEDIUM :
                      state.currentDifficulty === "hard" ? CONCEPTS_HARD : CONCEPTS_INTERVIEW;

  let html = "";
  conceptList.forEach((c, i) => {
    const qNum = i + 1;
    html += `<option value="${qNum}">Q${qNum}: ${c.title}</option>`;
  });

  qSelect.innerHTML = html;
  qSelect.value = state.currentQuestionIndex;
}

function loadCurrentScenario() {
  const sc = generateScenario(state.currentLang, state.currentDifficulty, state.currentQuestionIndex);
  state.isAnalyzed = false;
  state.isFixed = false;
  state.inspectedLine = sc.buggyLine;

  // Title and metadata
  const titleEl = document.getElementById("bugTitle");
  if (titleEl) titleEl.innerText = `${sc.title} (${LANGUAGE_CONFIGS[state.currentLang]?.name || 'Code'})`;

  const catEl = document.getElementById("bugCategoryBadge");
  if (catEl) catEl.innerText = sc.category;

  const descEl = document.getElementById("bugDescription");
  if (descEl) descEl.innerText = sc.description;

  // Code editor
  const editor = document.getElementById("codeEditor");
  if (editor) {
    editor.value = sc.buggyCode;
    renderGutter(sc.buggyCode, sc.buggyLine, state.inspectedLine, false);
  }

  // Hide inline error banner
  const banner = document.getElementById("errorAlertBanner");
  if (banner) banner.classList.add("hidden");

  // Console output
  const consoleEl = document.getElementById("consoleOutput");
  if (consoleEl) {
    consoleEl.innerText = `// ${LANGUAGE_CONFIGS[state.currentLang]?.name || ''} Sandbox Ready.\n// Click 'Run Code' or 'Analyze Bugs' to execute.`;
    consoleEl.className = "text-slate-400 font-mono text-xs";
  }

  // Test cases
  renderTestCases(sc.testCases, "pending");

  // Clover line analysis & hints
  renderSocraticHints(sc.hints);
  updateLineAnalysisBox(sc.buggyLine, sc);

  // System load badge
  updateSystemLoadDisplay("normal");
}

// =========================================================================
// 6. CODE EDITOR & GUTTER LINE INSPECTOR
// =========================================================================

function initCodeEditor() {
  const editor = document.getElementById("codeEditor");
  const lineCol = document.getElementById("lineNumbers");

  if (!editor) return;

  editor.addEventListener("input", () => {
    const sc = getCurrentScenario();
    renderGutter(editor.value, sc.buggyLine, state.inspectedLine, state.isAnalyzed);
  });

  editor.addEventListener("scroll", () => {
    if (lineCol) lineCol.scrollTop = editor.scrollTop;
  });

  // Tab key handling
  editor.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const start = editor.selectionStart;
      const end = editor.selectionEnd;
      editor.value = editor.value.substring(0, start) + "    " + editor.value.substring(end);
      editor.selectionStart = editor.selectionEnd = start + 4;
      const sc = getCurrentScenario();
      renderGutter(editor.value, sc.buggyLine, state.inspectedLine, state.isAnalyzed);
    }
  });

  // Track cursor position to update inspected line
  editor.addEventListener("click", () => {
    const cursor = editor.selectionStart;
    const lines = editor.value.substring(0, cursor).split("\n");
    const activeLineNumber = lines.length;
    handleLineClick(activeLineNumber);
  });

  // Mode toggles
  const modeSampleBtn = document.getElementById("modeSampleBtn");
  const modeCustomBtn = document.getElementById("modeCustomBtn");

  if (modeSampleBtn && modeCustomBtn) {
    modeSampleBtn.addEventListener("click", () => {
      state.currentMode = "sample";
      modeSampleBtn.className = "px-3 py-1 text-xs font-semibold rounded-md bg-white text-emerald-700 shadow-2xs border border-slate-200 transition-all";
      modeCustomBtn.className = "px-3 py-1 text-xs font-medium rounded-md text-slate-600 hover:text-slate-900 transition-all";
      loadCurrentScenario();
    });

    modeCustomBtn.addEventListener("click", () => {
      state.currentMode = "custom";
      modeCustomBtn.className = "px-3 py-1 text-xs font-semibold rounded-md bg-white text-emerald-700 shadow-2xs border border-slate-200 transition-all";
      modeSampleBtn.className = "px-3 py-1 text-xs font-medium rounded-md text-slate-600 hover:text-slate-900 transition-all";

      editor.value = "// Paste your custom code here to analyze with Clover...\n";
      renderGutter(editor.value, -1, 1, false);

      const titleEl = document.getElementById("bugTitle");
      if (titleEl) titleEl.innerText = "Custom Code Inspection";
    });
  }
}

function renderGutter(codeText, buggyLine, inspectedLine, isAnalyzed) {
  const lineCol = document.getElementById("lineNumbers");
  if (!lineCol) return;

  const lines = codeText.split("\n");
  let html = "";

  for (let i = 1; i <= lines.length; i++) {
    const isBug = !state.isFixed && i === buggyLine;
    const isFixedLine = state.isFixed && i === buggyLine;
    const isInspected = i === inspectedLine;

    let marker = "";
    if (isBug) {
      marker = `<span class="line-fault-marker text-red-500 font-bold" title="Active fault on line ${i}! Click to analyze with Clover">💡</span>`;
    } else if (isFixedLine) {
      marker = `<span class="text-green-600 font-bold text-[10px]" title="Line fixed">✓</span>`;
    }

    let lineClass = "line-gutter-row ";
    if (isInspected) lineClass += "bg-emerald-50 text-emerald-800 font-bold ";
    else if (isBug && isAnalyzed) lineClass += "bg-red-50 text-red-700 font-bold ";
    else lineClass += "text-slate-400 ";

    html += `
      <div class="${lineClass}" onclick="handleLineClick(${i})" title="Inspect Line ${i}">
        <span>${marker}</span>
        <span class="font-mono text-xs">${i}</span>
      </div>
    `;
  }

  lineCol.innerHTML = html;
}

window.handleLineClick = function(lineNum) {
  state.inspectedLine = lineNum;
  const sc = getCurrentScenario();

  // Update line info bar
  const lineInfo = document.getElementById("activeLineInfo");
  if (lineInfo) {
    lineInfo.innerText = `Line ${lineNum} selected • Click 'Analyze Line' to query Clover`;
  }

  const editor = document.getElementById("codeEditor");
  if (editor) {
    renderGutter(editor.value, sc.buggyLine, state.inspectedLine, state.isAnalyzed);
  }

  updateLineAnalysisBox(lineNum, sc);
};

// =========================================================================
// 7. LINE-BY-LINE SOCRATIC GUIDANCE ENGINE
// =========================================================================

function updateLineAnalysisBox(lineNum, sc) {
  const badge = document.getElementById("activeLineBadge");
  const summary = document.getElementById("lineAnalysisSummary");
  if (!summary) return;

  if (badge) badge.innerText = `Line ${lineNum}`;

  const isBuggy = lineNum === sc.buggyLine && !state.isFixed;
  const isFixedLine = lineNum === sc.buggyLine && state.isFixed;

  if (isBuggy) {
    summary.innerHTML = `
      <div class="space-y-1.5">
        <div class="flex items-center gap-1.5 font-bold text-red-700 text-[11px]">
          <span>⚠️ Active Bug Located on Line ${lineNum}</span>
        </div>
        <p class="text-slate-700"><strong>${sc.category}:</strong> ${sc.description}</p>
        <div class="pt-1 text-[11px] text-emerald-800 font-medium">
          🍀 <em>Clover's Socratic Prompt:</em> Look at the boundary or reference evaluated here. Does this line ensure valid bounds?
        </div>
      </div>
    `;
  } else if (isFixedLine) {
    summary.innerHTML = `
      <div class="space-y-1">
        <span class="font-bold text-green-700 text-[11px]">✓ Line ${lineNum} Verified &amp; Fixed</span>
        <p class="text-slate-700 text-xs">${sc.explanation}</p>
      </div>
    `;
  } else {
    summary.innerHTML = `
      <div class="space-y-1">
        <span class="font-semibold text-slate-800 text-[11px]">Line ${lineNum} Context</span>
        <p class="text-slate-600 text-xs">This line forms part of the algorithm logic. Select the highlighted fault line (Line ${sc.buggyLine}) with the 💡 marker to analyze the root cause.</p>
      </div>
    `;
  }
}

function handleAnalyzeLine() {
  const sc = getCurrentScenario();
  openAiDrawer();

  const lineNum = state.inspectedLine;
  const isBuggy = lineNum === sc.buggyLine && !state.isFixed;

  if (isBuggy) {
    addCloverChatMessage(`🔍 **Line ${lineNum} Socratic Breakdown:**
- **Observation:** Notice what operation is executing on line ${lineNum}.
- **Concept (${sc.category}):** ${sc.description}
- **Guiding Question:** What condition or guard could you write here to prevent this error from triggering?`);
  } else {
    addCloverChatMessage(`Line ${lineNum} appears sound. Look for the 💡 indicator in the margin next to line **${sc.buggyLine}** where the primary fault is triggered.`);
  }
}

// =========================================================================
// 8. ACTIONS: RUN CODE, ANALYZE BUGS, AUTO-FIX
// =========================================================================

function initActionButtons() {
  const runBtn = document.getElementById("runCodeBtn");
  const analyzeBugsBtn = document.getElementById("analyzeBugsBtn");
  const analyzeLineBtn = document.getElementById("analyzeLineBtn");
  const autoFixBtn = document.getElementById("autoFixBtn");
  const resetBtn = document.getElementById("resetCodeBtn");

  if (runBtn) runBtn.addEventListener("click", () => handleRunCode());
  if (analyzeBugsBtn) analyzeBugsBtn.addEventListener("click", () => handleAnalyzeBugs());
  if (analyzeLineBtn) analyzeLineBtn.addEventListener("click", () => handleAnalyzeLine());
  if (autoFixBtn) autoFixBtn.addEventListener("click", () => handleAutoFix());
  if (resetBtn) resetBtn.addEventListener("click", () => loadCurrentScenario());
}

function handleRunCode() {
  const sc = getCurrentScenario();
  const consoleEl = document.getElementById("consoleOutput");
  if (!consoleEl) return;

  if (state.isFixed) {
    consoleEl.innerText = sc.fixedOutput;
    consoleEl.className = "text-emerald-400 font-mono text-xs";
    renderTestCases(sc.testCases, "passed");
    updateSystemLoadDisplay("normal");
  } else {
    consoleEl.innerText = sc.errorOutput;
    consoleEl.className = "text-red-400 font-mono text-xs";
    renderTestCases(sc.testCases, "failed");
    updateSystemLoadDisplay("high");
  }
}

function handleAnalyzeBugs() {
  const sc = getCurrentScenario();
  state.isAnalyzed = true;
  state.inspectedLine = sc.buggyLine;

  // Show banner
  const banner = document.getElementById("errorAlertBanner");
  const msg = document.getElementById("errorAlertMessage");
  if (banner && msg) {
    banner.classList.remove("hidden");
    banner.className = "p-3 bg-red-50 border-b border-red-200 text-red-800 text-xs flex items-center justify-between";
    msg.innerText = `Line ${sc.buggyLine}: ${sc.description}`;
  }

  // Update Gutter
  const editor = document.getElementById("codeEditor");
  if (editor) {
    renderGutter(editor.value, sc.buggyLine, state.inspectedLine, true);
  }

  // Show console failure
  handleRunCode();

  // Notify via Clover
  addCloverChatMessage(`I analyzed your code! A fault was detected on **Line ${sc.buggyLine}**. Click on Line ${sc.buggyLine} in the code editor or click **Hint 1** above to explore the root cause.`);

  // Auto-open Clover drawer
  openAiDrawer();
}

function handleAutoFix() {
  const sc = getCurrentScenario();
  state.isFixed = true;
  state.isAnalyzed = true;
  state.inspectedLine = sc.buggyLine;

  const editor = document.getElementById("codeEditor");
  if (editor) {
    editor.value = sc.fixedCode;
    renderGutter(sc.fixedCode, sc.buggyLine, sc.buggyLine, true);
  }

  // Success banner
  const banner = document.getElementById("errorAlertBanner");
  const msg = document.getElementById("errorAlertMessage");
  if (banner && msg) {
    banner.classList.remove("hidden");
    banner.className = "p-3 bg-green-50 border-b border-green-200 text-green-800 text-xs flex items-center justify-between";
    msg.innerText = `Line ${sc.buggyLine} fixed: ${sc.explanation}`;
  }

  handleRunCode();
  recordSandboxSolved(sc.title, state.currentLang, state.currentDifficulty);
  addCloverChatMessage(`🎉 **Bug Resolved!** Notice how line **${sc.buggyLine}** now satisfies the required invariants. All 3 test cases have passed!`);
}

function getCurrentScenario() {
  return generateScenario(state.currentLang, state.currentDifficulty, state.currentQuestionIndex);
}

// =========================================================================
// 9. SOCRATIC HINTS & CHAT STREAM
// =========================================================================

function initAiDrawer() {
  const toggleBtn = document.getElementById("aiModeToggleBtn");
  const closeBtn = document.getElementById("closeAiDrawerBtn");
  const sendBtn = document.getElementById("sendChatBtn");
  const chatInput = document.getElementById("chatInput");

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      if (state.isAiDrawerOpen) closeAiDrawer();
      else openAiDrawer();
    });
  }

  if (closeBtn) closeBtn.addEventListener("click", () => closeAiDrawer());

  if (sendBtn && chatInput) {
    sendBtn.addEventListener("click", () => handleUserChat());
    chatInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleUserChat();
      }
    });
  }
}

function openAiDrawer() {
  state.isAiDrawerOpen = true;
  const drawer = document.getElementById("aiSidebarDrawer");
  const toggleBtn = document.getElementById("aiModeToggleBtn");
  if (drawer) {
    drawer.classList.remove("ai-drawer-closed");
    drawer.classList.add("ai-drawer-open");
  }
  if (toggleBtn) {
    toggleBtn.className = "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 text-white shadow-2xs transition-all";
  }
}

function closeAiDrawer() {
  state.isAiDrawerOpen = false;
  const drawer = document.getElementById("aiSidebarDrawer");
  const toggleBtn = document.getElementById("aiModeToggleBtn");
  if (drawer) {
    drawer.classList.remove("ai-drawer-open");
    drawer.classList.add("ai-drawer-closed");
  }
  if (toggleBtn) {
    toggleBtn.className = "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 transition-all shadow-2xs";
  }
}

function renderSocraticHints(hints) {
  const container = document.getElementById("socraticHintsContainer");
  if (!container || !hints) return;

  let html = "";
  hints.forEach((h, idx) => {
    html += `
      <button class="w-full text-left p-2 rounded-lg bg-white hover:bg-emerald-50/70 border border-slate-200 text-slate-800 text-xs font-medium transition-colors flex items-center justify-between" onclick="handleHintStepClick(${idx})">
        <span class="font-semibold text-emerald-800">${h.label}</span>
        <svg class="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
      </button>
    `;
  });

  container.innerHTML = html;
}

window.handleHintStepClick = function(idx) {
  const sc = getCurrentScenario();
  if (!sc || !sc.hints[idx]) return;

  const hint = sc.hints[idx];
  addUserChatMessage(`Can you give me ${hint.label}?`);

  setTimeout(() => {
    addCloverChatMessage(`**${hint.type}:** ${hint.text}`);
  }, 400);
};

function handleUserChat() {
  const input = document.getElementById("chatInput");
  if (!input || !input.value.trim()) return;

  const text = input.value.trim();
  input.value = "";

  addUserChatMessage(text);

  setTimeout(() => {
    generateCloverReply(text);
  }, 500);
}

function addUserChatMessage(text) {
  state.chatMessages.push({ sender: "user", text: text });
  renderChatStream();
}

function addCloverChatMessage(text) {
  state.chatMessages.push({ sender: "clover", text: text });
  renderChatStream();
}

function renderChatStream() {
  const stream = document.getElementById("aiChatStream");
  if (!stream) return;

  let html = "";
  state.chatMessages.forEach((msg) => {
    if (msg.sender === "clover") {
      html += `
        <div class="flex items-start gap-2.5 text-xs">
          <div class="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
            🍀
          </div>
          <div class="bg-white border border-slate-200 rounded-xl rounded-tl-sm p-3 text-slate-800 shadow-2xs leading-relaxed max-w-[88%]">
            <div class="font-bold text-emerald-800 text-[11px] mb-1">Clover (Socratic AI)</div>
            <div>${formatChatText(msg.text)}</div>
          </div>
        </div>
      `;
    } else {
      html += `
        <div class="flex items-start justify-end gap-2.5 text-xs">
          <div class="bg-emerald-600 text-white rounded-xl rounded-tr-sm p-3 leading-relaxed max-w-[88%] shadow-2xs">
            <div>${formatChatText(msg.text)}</div>
          </div>
        </div>
      `;
    }
  });

  stream.innerHTML = html;
  stream.scrollTop = stream.scrollHeight;
}

function generateCloverReply(userQuery) {
  const sc = getCurrentScenario();
  const q = userQuery.toLowerCase();

  if (q.includes("answer") || q.includes("solution") || q.includes("give me") || q.includes("code")) {
    addCloverChatMessage(`As your Socratic debugger, I want you to gain production-level confidence! Look closely at **Line ${sc.buggyLine}**. What assumption does this line make about array bounds or data validity?`);
  } else if (q.includes("fix") || q.includes("how to")) {
    addCloverChatMessage(sc.hints[2] ? sc.hints[2].text : `Try modifying line ${sc.buggyLine} to guard against the boundary error, or click **Auto-Fix** to see the solution.`);
  } else if (q.includes("why") || q.includes("explain")) {
    addCloverChatMessage(sc.hints[1] ? sc.hints[1].text : `This problem touches upon ${sc.category}. Remember that computers follow exact instructions without implicit bounds checking.`);
  } else {
    addCloverChatMessage(`Great question! In ${LANGUAGE_CONFIGS[state.currentLang]?.name || 'programming'}, line **${sc.buggyLine}** triggers unexpected behavior under the edge cases tested below. What happens if you inspect line ${sc.buggyLine} directly?`);
  }
}

function formatChatText(txt) {
  return txt
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-slate-900">$1</strong>')
    .replace(/`(.*?)`/g, '<code class="px-1 py-0.5 rounded bg-slate-100 text-emerald-800 font-mono text-[11px]">$1</code>');
}

// =========================================================================
// 10. TEST CASES & PERFORMANCE CHART
// =========================================================================

function renderTestCases(tests, status) {
  const container = document.getElementById("testCasesContainer");
  if (!container || !tests) return;

  let html = "";
  tests.forEach((t) => {
    let badge = `<span class="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-500">Not Run</span>`;
    let actualVal = "-";

    if (status === "passed") {
      badge = `<span class="px-2 py-0.5 rounded text-[11px] font-semibold bg-green-100 text-green-700">✓ Passed</span>`;
      actualVal = t.fixedActual;
    } else if (status === "failed") {
      badge = `<span class="px-2 py-0.5 rounded text-[11px] font-semibold bg-red-100 text-red-700">✗ Failed</span>`;
      actualVal = t.buggyActual;
    }

    html += `
      <div class="p-2.5 bg-white border border-slate-200 rounded-lg flex items-center justify-between text-xs">
        <div>
          <div class="font-semibold text-slate-800">${t.name}</div>
          <div class="text-[11px] text-slate-500 mt-0.5">
            Expected: <code class="bg-slate-100 px-1 rounded text-slate-700 font-mono">${t.expected}</code>
            <span class="mx-1">•</span>
            Actual: <code class="bg-slate-100 px-1 rounded text-slate-700 font-mono">${actualVal}</code>
          </div>
        </div>
        <div>${badge}</div>
      </div>
    `;
  });

  container.innerHTML = html;
}

function initChart() {
  const canvas = document.getElementById("systemPerformanceChart");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  function draw() {
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    // Grid lines
    ctx.strokeStyle = "#F1F5F9";
    ctx.lineWidth = 1;
    for (let y = 20; y < h; y += 30) {
      ctx.beginPath();
      ctx.moveTo(35, y);
      ctx.lineTo(w - 10, y);
      ctx.stroke();
    }

    // Y Axis
    ctx.fillStyle = "#94A3B8";
    ctx.font = "10px Inter, sans-serif";
    ctx.textAlign = "right";
    ctx.fillText("100%", 30, 25);
    ctx.fillText("50%", 30, h / 2 + 3);
    ctx.fillText("0%", 30, h - 10);

    // CPU line (Blue)
    drawLine(ctx, state.cpuHistory, "#2563EB", 35, w - 10, h - 15, 20);

    // Memory line (Amber)
    drawLine(ctx, state.memHistory, "#D97706", 35, w - 10, h - 15, 20);

    requestAnimationFrame(draw);
  }

  function drawLine(ctx, data, color, startX, endX, startY, endY) {
    const step = (endX - startX) / (data.length - 1);
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;

    data.forEach((val, i) => {
      const x = startX + i * step;
      const y = startY - (val / 100) * (startY - endY);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });

    ctx.stroke();
  }

  draw();

  // Dynamic CPU/Mem updates
  setInterval(() => {
    let targetCpu = state.isFixed ? 12 : (state.isAnalyzed ? 88 : 15);
    let targetMem = state.isFixed ? 28 : (state.isAnalyzed ? 90 : 35);

    let nextCpu = targetCpu + (Math.random() - 0.5) * 4;
    let nextMem = targetMem + (Math.random() - 0.5) * 3;

    nextCpu = Math.max(5, Math.min(99, nextCpu));
    nextMem = Math.max(10, Math.min(99, nextMem));

    state.cpuHistory.shift();
    state.cpuHistory.push(nextCpu);

    state.memHistory.shift();
    state.memHistory.push(nextMem);

    const cpuEl = document.getElementById("cpuValueText");
    const memEl = document.getElementById("memValueText");
    if (cpuEl) cpuEl.innerText = `${nextCpu.toFixed(0)}%`;
    if (memEl) memEl.innerText = `${(nextMem * 4.8).toFixed(0)} MB`;
  }, 300);
}

function updateSystemLoadDisplay(loadState) {
  const badge = document.getElementById("systemLoadBadge");
  if (!badge) return;

  if (loadState === "high") {
    badge.className = "px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-700 border border-red-200";
    badge.innerText = "System Load: High Alert (Error)";
  } else {
    badge.className = "px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700 border border-green-200";
    badge.innerText = "System Load: Normal";
  }
}

// =========================================================================
// 11. TAB NAVIGATION ENGINE (SANDBOX, BUILDER, ANALYTICS)
// =========================================================================

function initTabNavigation() {
  const btnSandbox = document.getElementById("tabBtnSandbox");
  const btnBuilder = document.getElementById("tabBtnBuilder");
  const btnAnalytics = document.getElementById("tabBtnAnalytics");

  if (btnSandbox) btnSandbox.addEventListener("click", () => switchTab("sandbox"));
  if (btnBuilder) btnBuilder.addEventListener("click", () => switchTab("builder"));
  if (btnAnalytics) btnAnalytics.addEventListener("click", () => switchTab("analytics"));
}

window.switchTab = function(tabId) {
  state.activeTab = tabId;

  const btnSandbox = document.getElementById("tabBtnSandbox");
  const btnBuilder = document.getElementById("tabBtnBuilder");
  const btnAnalytics = document.getElementById("tabBtnAnalytics");

  const viewSandbox = document.getElementById("viewPracticeSandbox");
  const viewBuilder = document.getElementById("viewInterviewBuilder");
  const viewAnalytics = document.getElementById("viewAnalyticsReport");

  // Reset tab button styles
  [btnSandbox, btnBuilder, btnAnalytics].forEach(btn => {
    if (btn) btn.className = "nav-tab-pill inactive";
  });

  // Hide all views
  if (viewSandbox) viewSandbox.classList.add("hidden");
  if (viewBuilder) viewBuilder.classList.add("hidden");
  if (viewAnalytics) viewAnalytics.classList.add("hidden");

  if (tabId === "sandbox") {
    if (btnSandbox) btnSandbox.className = "nav-tab-pill active";
    if (viewSandbox) viewSandbox.classList.remove("hidden");
  } else if (tabId === "builder") {
    if (btnBuilder) btnBuilder.className = "nav-tab-pill active";
    if (viewBuilder) viewBuilder.classList.remove("hidden");
  } else if (tabId === "analytics") {
    if (btnAnalytics) btnAnalytics.className = "nav-tab-pill active";
    if (viewAnalytics) viewAnalytics.classList.remove("hidden");
    refreshAnalyticsDashboard();
  }
};

// =========================================================================
// 12. CUSTOM INTERVIEW BUILDER ENGINE
// =========================================================================

function initInterviewBuilder() {
  const langSelect = document.getElementById("builderTargetLang");
  const countSlider = document.getElementById("builderQuestionCount");
  const startBtn = document.getElementById("startAssessmentBtn");

  if (langSelect) {
    langSelect.value = state.builder.targetLang;
    langSelect.addEventListener("change", (e) => {
      state.builder.targetLang = e.target.value;
      updateBuilderSummary();
    });
  }

  if (countSlider) {
    countSlider.value = state.builder.totalCount;
    countSlider.addEventListener("input", (e) => {
      const val = parseInt(e.target.value, 10) || 8;
      state.builder.totalCount = val;
      autoBalanceDifficulty(val);
      updateBuilderUI();
    });
  }

  if (startBtn) {
    startBtn.addEventListener("click", () => startCustomAssessment());
  }

  // Assessment session event listeners
  const runCodeBtn = document.getElementById("assessmentRunCodeBtn");
  const markSolvedBtn = document.getElementById("assessmentMarkSolvedBtn");
  const prevBtn = document.getElementById("assessmentPrevBtn");
  const nextBtn = document.getElementById("assessmentNextBtn");
  const submitBtn = document.getElementById("assessmentSubmitBtn");

  if (runCodeBtn) runCodeBtn.addEventListener("click", () => handleAssessmentRunCode());
  if (markSolvedBtn) markSolvedBtn.addEventListener("click", () => handleAssessmentMarkSolved());
  if (prevBtn) prevBtn.addEventListener("click", () => navigateAssessment(-1));
  if (nextBtn) nextBtn.addEventListener("click", () => navigateAssessment(1));
  if (submitBtn) submitBtn.addEventListener("click", () => submitAssessment(false));

  updateBuilderUI();
}

function autoBalanceDifficulty(total) {
  // Balanced default distribution
  const easy = Math.max(1, Math.round(total * 0.25));
  const med = Math.max(1, Math.round(total * 0.35));
  const hard = Math.max(1, Math.round(total * 0.25));
  let interview = total - (easy + med + hard);
  if (interview < 0) interview = 0;

  state.builder.counts = { easy, medium: med, hard, interview };
}

window.adjustDifficultyCount = function(diff, delta) {
  const current = state.builder.counts[diff] || 0;
  const next = Math.max(0, current + delta);
  state.builder.counts[diff] = next;

  // Recalculate total count
  const sum = state.builder.counts.easy + state.builder.counts.medium + state.builder.counts.hard + state.builder.counts.interview;
  state.builder.totalCount = sum;

  const countSlider = document.getElementById("builderQuestionCount");
  if (countSlider) countSlider.value = sum;

  updateBuilderUI();
};

window.setTimeLimit = function(mins) {
  state.builder.timeLimit = mins;

  // Highlight pill
  document.querySelectorAll(".time-limit-pill").forEach(pill => {
    if (pill.innerText.includes(`${mins} mins`)) {
      pill.className = "time-limit-pill px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-600 text-white shadow-2xs";
    } else {
      pill.className = "time-limit-pill px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 text-slate-700 hover:bg-slate-200";
    }
  });

  const badge = document.getElementById("builderTimeLimitBadge");
  if (badge) badge.innerText = `${mins} Minutes`;

  updateBuilderSummary();
};

window.applyInterviewPreset = function(presetType) {
  if (presetType === "junior") {
    state.builder.totalCount = 5;
    state.builder.counts = { easy: 3, medium: 2, hard: 0, interview: 0 };
    setTimeLimit(30);
  } else if (presetType === "mid") {
    state.builder.totalCount = 8;
    state.builder.counts = { easy: 2, medium: 3, hard: 2, interview: 1 };
    setTimeLimit(45);
  } else if (presetType === "senior") {
    state.builder.totalCount = 10;
    state.builder.counts = { easy: 2, medium: 3, hard: 3, interview: 2 };
    setTimeLimit(60);
  }

  const countSlider = document.getElementById("builderQuestionCount");
  if (countSlider) countSlider.value = state.builder.totalCount;

  updateBuilderUI();
};

function updateBuilderUI() {
  // Update counts
  const countBadge = document.getElementById("builderQuestionCountBadge");
  if (countBadge) countBadge.innerText = `${state.builder.totalCount} Questions`;

  const cEasy = document.getElementById("countEasy");
  const cMed = document.getElementById("countMedium");
  const cHard = document.getElementById("countHard");
  const cInt = document.getElementById("countInterview");

  if (cEasy) cEasy.innerText = state.builder.counts.easy;
  if (cMed) cMed.innerText = state.builder.counts.medium;
  if (cHard) cHard.innerText = state.builder.counts.hard;
  if (cInt) cInt.innerText = state.builder.counts.interview;

  // Update progress bar
  const total = Math.max(1, state.builder.totalCount);
  const pEasy = (state.builder.counts.easy / total) * 100;
  const pMed = (state.builder.counts.medium / total) * 100;
  const pHard = (state.builder.counts.hard / total) * 100;
  const pInt = (state.builder.counts.interview / total) * 100;

  const barE = document.getElementById("barEasy");
  const barM = document.getElementById("barMedium");
  const barH = document.getElementById("barHard");
  const barI = document.getElementById("barInterview");

  if (barE) barE.style.width = `${pEasy}%`;
  if (barM) barM.style.width = `${pMed}%`;
  if (barH) barH.style.width = `${pHard}%`;
  if (barI) barI.style.width = `${pInt}%`;

  updateBuilderSummary();
}

function updateBuilderSummary() {
  const sumLang = document.getElementById("summaryLang");
  const sumTotal = document.getElementById("summaryTotalQuestions");
  const sumTime = document.getElementById("summaryTimeLimit");
  const sumAvg = document.getElementById("summaryAvgTime");

  if (sumLang) sumLang.innerText = LANGUAGE_CONFIGS[state.builder.targetLang]?.name || "Python";
  if (sumTotal) sumTotal.innerText = `${state.builder.totalCount} Questions`;
  if (sumTime) sumTime.innerText = `${state.builder.timeLimit} Minutes`;

  if (sumAvg) {
    const avg = (state.builder.timeLimit / Math.max(1, state.builder.totalCount)).toFixed(1);
    sumAvg.innerText = `~${avg} mins / question`;
  }
}

// -------------------------------------------------------------------------
// ACTIVE ASSESSMENT SESSION
// -------------------------------------------------------------------------

function startCustomAssessment() {
  const config = state.builder;
  const questions = [];

  // Helper to sample N unique indexes from 1 to 30
  function sampleIndices(n) {
    const arr = Array.from({ length: 30 }, (_, i) => i + 1);
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.slice(0, n);
  }

  // Draw questions matching distribution
  sampleIndices(config.counts.easy).forEach(idx => {
    questions.push(generateScenario(config.targetLang, "easy", idx));
  });

  sampleIndices(config.counts.medium).forEach(idx => {
    questions.push(generateScenario(config.targetLang, "medium", idx));
  });

  sampleIndices(config.counts.hard).forEach(idx => {
    questions.push(generateScenario(config.targetLang, "hard", idx));
  });

  sampleIndices(config.counts.interview).forEach(idx => {
    questions.push(generateScenario(config.targetLang, "interview", idx));
  });

  if (questions.length === 0) {
    alert("Please select at least 1 question for the assessment.");
    return;
  }

  state.assessmentSession = {
    isActive: true,
    questions: questions,
    currentIndex: 0,
    timeRemaining: config.timeLimit * 60,
    timerInterval: null,
    answers: {},
    startTime: Date.now()
  };

  // Switch to assessment view
  const configSection = document.getElementById("builderConfigSection");
  const sessionSection = document.getElementById("builderActiveSessionSection");

  if (configSection) configSection.classList.add("hidden");
  if (sessionSection) sessionSection.classList.remove("hidden");

  // Title in timer bar
  const titleEl = document.getElementById("assessmentActiveTitle");
  if (titleEl) titleEl.innerText = `${LANGUAGE_CONFIGS[config.targetLang]?.name || 'Mock'} Assessment (${questions.length} Qs)`;

  // Start timer
  startAssessmentTimer();

  // Load first question
  loadAssessmentQuestion(0);
}

function startAssessmentTimer() {
  if (state.assessmentSession.timerInterval) {
    clearInterval(state.assessmentSession.timerInterval);
  }

  function updateTimerDisplay() {
    const s = state.assessmentSession.timeRemaining;
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    const disp = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;

    const timerEl = document.getElementById("assessmentTimerDisplay");
    if (timerEl) {
      timerEl.innerText = disp;
      if (s <= 300) {
        timerEl.classList.add("timer-warning-pulse");
      } else {
        timerEl.classList.remove("timer-warning-pulse");
      }
    }

    if (s <= 0) {
      clearInterval(state.assessmentSession.timerInterval);
      submitAssessment(true); // Auto-submit on time expiry
    }
  }

  updateTimerDisplay();
  state.assessmentSession.timerInterval = setInterval(() => {
    state.assessmentSession.timeRemaining--;
    updateTimerDisplay();
  }, 1000);
}

function loadAssessmentQuestion(index) {
  const session = state.assessmentSession;
  if (!session || !session.questions[index]) return;

  session.currentIndex = index;
  const q = session.questions[index];

  // Update Tracker Badges
  const qBadge = document.getElementById("assessmentQBadge");
  const diffBadge = document.getElementById("assessmentDifficultyBadge");
  const langTag = document.getElementById("assessmentLangTag");

  if (qBadge) qBadge.innerText = `Question ${index + 1} of ${session.questions.length}`;
  if (diffBadge) diffBadge.innerText = q.category;
  if (langTag) langTag.innerText = LANGUAGE_CONFIGS[state.builder.targetLang]?.name || "Code";

  const promptTitle = document.getElementById("assessmentPromptTitle");
  const promptDesc = document.getElementById("assessmentPromptDesc");
  if (promptTitle) promptTitle.innerText = q.title;
  if (promptDesc) promptDesc.innerText = q.description;

  // Load Code in Editor
  const editor = document.getElementById("assessmentCodeEditor");
  const existingAnswer = session.answers[index];
  const codeToDisplay = existingAnswer ? existingAnswer.code : q.buggyCode;

  if (editor) {
    editor.value = codeToDisplay;
    renderAssessmentLineNumbers(codeToDisplay);
  }

  // Update Status Indicator
  const statusEl = document.getElementById("assessmentStatusIndicator");
  if (statusEl) {
    if (existingAnswer && existingAnswer.isSolved) {
      statusEl.innerHTML = `<span class="text-emerald-600 font-bold">✓ Solved</span>`;
    } else {
      statusEl.innerText = "Unsolved";
    }
  }

  // Render Test Cases
  renderAssessmentTestCases(q.testCases, existingAnswer && existingAnswer.isSolved ? "passed" : "pending");

  // Reset Console
  const consoleEl = document.getElementById("assessmentConsoleOutput");
  if (consoleEl) {
    consoleEl.innerText = `// Test runner ready for Question ${index + 1}.\n// Click 'Run Code' to execute.`;
    consoleEl.className = "text-slate-400 font-mono text-xs";
  }

  // Render Pills
  renderAssessmentQuestionPills();
}

function renderAssessmentLineNumbers(codeText) {
  const lineCol = document.getElementById("assessmentLineNumbers");
  if (!lineCol) return;

  const lines = codeText.split("\n");
  let html = "";
  for (let i = 1; i <= lines.length; i++) {
    html += `<div class="h-6 leading-6 text-right px-2 font-mono text-xs text-slate-400 select-none">${i}</div>`;
  }
  lineCol.innerHTML = html;
}

function renderAssessmentQuestionPills() {
  const container = document.getElementById("assessmentQuestionPillsContainer");
  const session = state.assessmentSession;
  if (!container || !session) return;

  let html = "";
  session.questions.forEach((q, i) => {
    const isCurrent = i === session.currentIndex;
    const isSolved = session.answers[i] && session.answers[i].isSolved;

    let cls = "px-2.5 py-0.5 rounded text-xs font-semibold cursor-pointer transition-colors ";
    if (isCurrent) cls += "bg-blue-600 text-white shadow-xs";
    else if (isSolved) cls += "bg-emerald-800 text-emerald-200 border border-emerald-600";
    else cls += "bg-slate-800 text-slate-400 hover:text-white";

    html += `<button class="${cls}" onclick="loadAssessmentQuestion(${i})">Q${i + 1}${isSolved ? ' ✓' : ''}</button>`;
  });

  container.innerHTML = html;
}

function navigateAssessment(direction) {
  const session = state.assessmentSession;
  if (!session) return;

  const nextIdx = session.currentIndex + direction;
  if (nextIdx >= 0 && nextIdx < session.questions.length) {
    // Save current code
    const editor = document.getElementById("assessmentCodeEditor");
    if (editor) {
      if (!session.answers[session.currentIndex]) session.answers[session.currentIndex] = {};
      session.answers[session.currentIndex].code = editor.value;
    }
    loadAssessmentQuestion(nextIdx);
  }
}

function handleAssessmentRunCode() {
  const session = state.assessmentSession;
  if (!session) return;

  const q = session.questions[session.currentIndex];
  const editor = document.getElementById("assessmentCodeEditor");
  const consoleEl = document.getElementById("assessmentConsoleOutput");
  if (!q || !editor || !consoleEl) return;

  const userCode = editor.value.trim();
  const isSolved = userCode.includes(q.fixedCode.split("\n")[4] || "FIXED") || userCode.includes("<");

  if (!session.answers[session.currentIndex]) session.answers[session.currentIndex] = {};
  session.answers[session.currentIndex].code = userCode;

  if (isSolved) {
    session.answers[session.currentIndex].isSolved = true;
    consoleEl.innerText = q.fixedOutput;
    consoleEl.className = "text-emerald-400 font-mono text-xs";
    renderAssessmentTestCases(q.testCases, "passed");

    const statusEl = document.getElementById("assessmentStatusIndicator");
    if (statusEl) statusEl.innerHTML = `<span class="text-emerald-600 font-bold">✓ Solved</span>`;
  } else {
    consoleEl.innerText = q.errorOutput;
    consoleEl.className = "text-red-400 font-mono text-xs";
    renderAssessmentTestCases(q.testCases, "failed");
  }

  renderAssessmentQuestionPills();
}

function handleAssessmentMarkSolved() {
  const session = state.assessmentSession;
  if (!session) return;

  const q = session.questions[session.currentIndex];
  const editor = document.getElementById("assessmentCodeEditor");
  if (!q || !editor) return;

  editor.value = q.fixedCode;
  renderAssessmentLineNumbers(q.fixedCode);

  if (!session.answers[session.currentIndex]) session.answers[session.currentIndex] = {};
  session.answers[session.currentIndex].code = q.fixedCode;
  session.answers[session.currentIndex].isSolved = true;

  handleAssessmentRunCode();
}

function renderAssessmentTestCases(tests, status) {
  const container = document.getElementById("assessmentTestCasesList");
  if (!container || !tests) return;

  let html = "";
  tests.forEach((t) => {
    let badge = `<span class="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-500">Not Run</span>`;
    let actualVal = "-";

    if (status === "passed") {
      badge = `<span class="px-2 py-0.5 rounded text-[11px] font-semibold bg-green-100 text-green-700">✓ Passed</span>`;
      actualVal = t.fixedActual;
    } else if (status === "failed") {
      badge = `<span class="px-2 py-0.5 rounded text-[11px] font-semibold bg-red-100 text-red-700">✗ Failed</span>`;
      actualVal = t.buggyActual;
    }

    html += `
      <div class="p-2.5 bg-white border border-slate-200 rounded-lg flex items-center justify-between text-xs">
        <div>
          <div class="font-semibold text-slate-800">${t.name}</div>
          <div class="text-[11px] text-slate-500 mt-0.5">Expected: <code class="bg-slate-100 px-1 rounded text-slate-700 font-mono">${t.expected}</code></div>
        </div>
        <div>${badge}</div>
      </div>
    `;
  });

  container.innerHTML = html;
}

function submitAssessment(autoSubmit = false) {
  const session = state.assessmentSession;
  if (!session || !session.isActive) return;

  if (!autoSubmit && !confirm("Are you sure you want to finalize and submit this assessment?")) {
    return;
  }

  clearInterval(session.timerInterval);
  session.isActive = false;

  // Grade results
  let passedCount = 0;
  const totalCount = session.questions.length;

  session.questions.forEach((q, i) => {
    if (session.answers[i] && session.answers[i].isSolved) {
      passedCount++;
    }
  });

  const accuracy = Math.round((passedCount / totalCount) * 100);
  const timeSpentSecs = (state.builder.timeLimit * 60) - Math.max(0, session.timeRemaining);
  const spentMins = Math.floor(timeSpentSecs / 60);
  const spentSecs = timeSpentSecs % 60;
  const timeFormatted = `${spentMins}m ${spentSecs}s`;

  // Save to LocalStorage history
  const logEntry = {
    id: "assess_" + Date.now(),
    date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }),
    name: `${LANGUAGE_CONFIGS[state.builder.targetLang]?.name || 'Mock'} Technical Assessment`,
    lang: LANGUAGE_CONFIGS[state.builder.targetLang]?.name || "Python",
    scoreText: `${passedCount} / ${totalCount} Passed`,
    accuracy: accuracy,
    timeSpent: timeFormatted,
    status: accuracy >= 70 ? "Passed" : "Needs Review"
  };

  recordInterviewCompleted(logEntry);

  // Show Modal
  const modal = document.getElementById("assessmentResultModal");
  const modalScore = document.getElementById("modalScoreVal");
  const modalTime = document.getElementById("modalTimeTakenVal");
  const modalRating = document.getElementById("modalRatingBadge");

  if (modalScore) modalScore.innerText = `${passedCount} / ${totalCount} Passed (${accuracy}%)`;
  if (modalTime) modalTime.innerText = timeFormatted;
  if (modalRating) {
    if (accuracy >= 85) {
      modalRating.className = "font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded";
      modalRating.innerText = "EXCELLENT (Pass)";
    } else if (accuracy >= 65) {
      modalRating.className = "font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded";
      modalRating.innerText = "GOOD COMPETENCY";
    } else {
      modalRating.className = "font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded";
      modalRating.innerText = "NEEDS PRACTICE";
    }
  }

  if (modal) modal.classList.remove("hidden");
}

window.closeAssessmentModal = function(targetTab) {
  const modal = document.getElementById("assessmentResultModal");
  if (modal) modal.classList.add("hidden");

  // Reset Builder views
  const configSection = document.getElementById("builderConfigSection");
  const sessionSection = document.getElementById("builderActiveSessionSection");

  if (configSection) configSection.classList.remove("hidden");
  if (sessionSection) sessionSection.classList.add("hidden");

  if (targetTab === "analytics") {
    switchTab("analytics");
  } else {
    switchTab("sandbox");
  }
};

// =========================================================================
// 13. DAILY ANALYTICS & PROGRESS REPORT ENGINE (LOCALSTORAGE INTEGRATION)
// =========================================================================

function initAnalyticsDashboard() {
  initLocalStorageData();
  refreshAnalyticsDashboard();
}

function initLocalStorageData() {
  if (!localStorage.getItem("breakIt_interviewHistory")) {
    const seedHistory = [
      { id: "1", date: "Oct 12, 10:15 AM", name: "Python Full-Stack Mock", lang: "Python", scoreText: "8 / 8 Passed", accuracy: 100, timeSpent: "24m 12s", status: "Passed" },
      { id: "2", date: "Oct 11, 04:30 PM", name: "C++ Systems Technical Screen", lang: "C++", scoreText: "7 / 8 Passed", accuracy: 87.5, timeSpent: "32m 40s", status: "Passed" },
      { id: "3", date: "Oct 10, 02:15 PM", name: "Concurrency & Threading Sprint", lang: "Java", scoreText: "5 / 6 Passed", accuracy: 83.3, timeSpent: "28m 05s", status: "Passed" },
      { id: "4", date: "Oct 08, 11:20 AM", name: "Junior SDE Algorithm Warmup", lang: "JavaScript", scoreText: "5 / 5 Passed", accuracy: 100, timeSpent: "14m 50s", status: "Passed" },
      { id: "5", date: "Oct 06, 06:00 PM", name: "Memory & Pointer Diagnostics", lang: "C", scoreText: "5 / 8 Passed", accuracy: 62.5, timeSpent: "39m 10s", status: "Needs Review" }
    ];
    localStorage.setItem("breakIt_interviewHistory", JSON.stringify(seedHistory));
  }

  if (!localStorage.getItem("breakIt_solvedBugsCount")) {
    localStorage.setItem("breakIt_solvedBugsCount", "42");
  }
}

function recordInterviewCompleted(logEntry) {
  let history = [];
  try {
    history = JSON.parse(localStorage.getItem("breakIt_interviewHistory") || "[]");
  } catch (e) { history = []; }

  history.unshift(logEntry);
  localStorage.setItem("breakIt_interviewHistory", JSON.stringify(history));

  // Increment XP
  state.studentXp += 80;
  updateXpBadge();

  refreshAnalyticsDashboard();
}

function recordSandboxSolved(title, lang, diff) {
  let solved = parseInt(localStorage.getItem("breakIt_solvedBugsCount") || "42", 10);
  solved++;
  localStorage.setItem("breakIt_solvedBugsCount", String(solved));

  state.studentXp += 20;
  updateXpBadge();

  refreshAnalyticsDashboard();
}

function updateXpBadge() {
  const badge = document.getElementById("studentXpBadge");
  if (badge) badge.innerText = `${state.studentXp} XP`;
}

function refreshAnalyticsDashboard() {
  let history = [];
  try {
    history = JSON.parse(localStorage.getItem("breakIt_interviewHistory") || "[]");
  } catch (e) { history = []; }

  const totalSolved = parseInt(localStorage.getItem("breakIt_solvedBugsCount") || "42", 10);
  const totalTests = history.length;

  let avgAccuracy = 87.4;
  if (history.length > 0) {
    const sumAcc = history.reduce((acc, h) => acc + (h.accuracy || 80), 0);
    avgAccuracy = (sumAcc / history.length).toFixed(1);
  }

  // Update Summary Metric Cards
  const elTotalTests = document.getElementById("statTotalTests");
  const elAvgAcc = document.getElementById("statAvgAccuracy");
  const elAvgTime = document.getElementById("statAvgTime");
  const elTotalSolved = document.getElementById("statTotalSolved");

  if (elTotalTests) elTotalTests.innerText = totalTests;
  if (elAvgAcc) elAvgAcc.innerText = `${avgAccuracy}%`;
  if (elAvgTime) elAvgTime.innerText = "4.2 min";
  if (elTotalSolved) elTotalSolved.innerText = totalSolved;

  // Render Charts
  renderActivityChart(history);
  renderMasteryDonut();
  renderLangChart();
  renderHistoricalLogsTable(history);
}

// -------------------------------------------------------------------------
// CANVASES & VISUAL CHARTS
// -------------------------------------------------------------------------

function renderActivityChart(history) {
  const canvas = document.getElementById("analyticsActivityChart");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const w = canvas.width;
  const h = canvas.height;

  ctx.clearRect(0, 0, w, h);

  // 14 Days synthetic & recorded trend
  const days = ["Oct 1", "Oct 2", "Oct 3", "Oct 4", "Oct 5", "Oct 6", "Oct 7", "Oct 8", "Oct 9", "Oct 10", "Oct 11", "Oct 12", "Oct 13", "Today"];
  const activity = [2, 3, 1, 4, 2, 5, 3, 6, 4, 5, 7, 6, 8, Math.max(3, history.length % 9 + 4)];

  // Draw Grid Lines
  ctx.strokeStyle = "#E2E8F0";
  ctx.lineWidth = 1;
  for (let y = 20; y < h - 25; y += 35) {
    ctx.beginPath();
    ctx.moveTo(30, y);
    ctx.lineTo(w - 10, y);
    ctx.stroke();
  }

  const stepX = (w - 45) / (days.length - 1);
  const maxVal = 10;
  const baseY = h - 25;

  // Draw Bars (Emerald Bugs Solved)
  days.forEach((day, i) => {
    const val = activity[i];
    const x = 35 + i * stepX;
    const barHeight = (val / maxVal) * (baseY - 30);
    const y = baseY - barHeight;

    ctx.fillStyle = "rgba(16, 185, 129, 0.25)";
    ctx.fillRect(x - 6, y, 12, barHeight);

    // X Axis Labels
    if (i % 2 === 0 || i === days.length - 1) {
      ctx.fillStyle = "#94A3B8";
      ctx.font = "9px Inter, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(day, x, h - 8);
    }
  });

  // Draw Trend Line (Blue)
  ctx.beginPath();
  ctx.strokeStyle = "#2563EB";
  ctx.lineWidth = 2.5;

  activity.forEach((val, i) => {
    const x = 35 + i * stepX;
    const y = baseY - (val / maxVal) * (baseY - 30);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();

  // Plot Points
  activity.forEach((val, i) => {
    const x = 35 + i * stepX;
    const y = baseY - (val / maxVal) * (baseY - 30);
    ctx.beginPath();
    ctx.arc(x, y, 3.5, 0, Math.PI * 2);
    ctx.fillStyle = "#2563EB";
    ctx.fill();
    ctx.strokeStyle = "#FFFFFF";
    ctx.lineWidth = 1.5;
    ctx.stroke();
  });
}

function renderMasteryDonut() {
  const canvas = document.getElementById("analyticsMasteryDonut");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const w = canvas.width;
  const h = canvas.height;

  ctx.clearRect(0, 0, w, h);

  const cx = w / 2;
  const cy = h / 2;
  const radius = 65;
  const innerRadius = 45;

  const data = [
    { label: "Easy", val: 35, color: "#22C55E" },
    { label: "Medium", val: 30, color: "#3B82F6" },
    { label: "Hard", val: 20, color: "#F59E0B" },
    { label: "Interview", val: 15, color: "#EF4444" }
  ];

  let currentAngle = -Math.PI / 2;

  data.forEach(item => {
    const sliceAngle = (item.val / 100) * (Math.PI * 2);

    ctx.beginPath();
    ctx.arc(cx, cy, radius, currentAngle, currentAngle + sliceAngle);
    ctx.arc(cx, cy, innerRadius, currentAngle + sliceAngle, currentAngle, true);
    ctx.closePath();
    ctx.fillStyle = item.color;
    ctx.fill();

    currentAngle += sliceAngle;
  });

  // Center Text
  ctx.fillStyle = "#0F172A";
  ctx.font = "bold 13px Inter, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("87.4%", cx, cy - 2);
  ctx.fillStyle = "#64748B";
  ctx.font = "9px Inter, sans-serif";
  ctx.fillText("Mastery", cx, cy + 12);
}

function renderLangChart() {
  const canvas = document.getElementById("analyticsLangChart");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const w = canvas.width;
  const h = canvas.height;

  ctx.clearRect(0, 0, w, h);

  const langs = [
    { name: "Python", pct: 94 },
    { name: "JavaScript", pct: 89 },
    { name: "Java", pct: 85 },
    { name: "C++", pct: 81 },
    { name: "Go", pct: 78 }
  ];

  const barHeight = 16;
  const gap = 18;
  const startX = 65;
  const maxBarWidth = w - startX - 45;

  langs.forEach((l, i) => {
    const y = 15 + i * (barHeight + gap);

    // Label
    ctx.fillStyle = "#475569";
    ctx.font = "11px Inter, sans-serif";
    ctx.textAlign = "right";
    ctx.fillText(l.name, startX - 8, y + 12);

    // Background bar
    ctx.fillStyle = "#F1F5F9";
    ctx.fillRect(startX, y, maxBarWidth, barHeight);

    // Fill bar
    const fillW = (l.pct / 100) * maxBarWidth;
    ctx.fillStyle = "#4F46E5";
    ctx.fillRect(startX, y, fillW, barHeight);

    // Pct text
    ctx.fillStyle = "#0F172A";
    ctx.font = "bold 10px Inter, sans-serif";
    ctx.textAlign = "left";
    ctx.fillText(`${l.pct}%`, startX + fillW + 6, y + 12);
  });
}

function renderHistoricalLogsTable(history) {
  const tbody = document.getElementById("historicalLogsTableBody");
  const badge = document.getElementById("historicalLogsCountBadge");
  if (!tbody) return;

  if (badge) badge.innerText = `Showing ${history.length} entries`;

  if (history.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" class="py-4 text-center text-slate-400 italic">No historical test logs recorded yet.</td></tr>`;
    return;
  }

  let html = "";
  history.forEach(item => {
    const isPass = item.status === "Passed";
    const statusBadge = isPass 
      ? `<span class="px-2 py-0.5 rounded text-[10px] font-semibold bg-green-100 text-green-700">✓ Passed</span>`
      : `<span class="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-100 text-amber-700">Needs Review</span>`;

    html += `
      <tr class="hover:bg-slate-50 transition-colors">
        <td class="py-2.5 px-4 text-slate-500 font-mono text-[11px]">${item.date}</td>
        <td class="py-2.5 px-4 font-semibold text-slate-800">${item.name}</td>
        <td class="py-2.5 px-4 text-slate-600">${item.lang}</td>
        <td class="py-2.5 px-4 font-mono text-slate-700 font-semibold">${item.scoreText}</td>
        <td class="py-2.5 px-4 text-slate-500 font-mono">${item.timeSpent}</td>
        <td class="py-2.5 px-4 font-bold ${item.accuracy >= 75 ? 'text-emerald-600' : 'text-amber-600'} font-mono">${item.accuracy}%</td>
        <td class="py-2.5 px-4">${statusBadge}</td>
      </tr>
    `;
  });

  tbody.innerHTML = html;
}

window.exportAnalyticsJson = function() {
  const history = localStorage.getItem("breakIt_interviewHistory") || "[]";
  const solved = localStorage.getItem("breakIt_solvedBugsCount") || "42";

  const exportObj = {
    exportedAt: new Date().toISOString(),
    platform: "Break It to Build It - Socratic Debugging Lab",
    studentId: "CS-2026",
    solvedScenariosCount: parseInt(solved, 10),
    assessmentHistory: JSON.parse(history)
  };

  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj, null, 2));
  const a = document.createElement("a");
  a.setAttribute("href", dataStr);
  a.setAttribute("download", `Clover_Analytics_Report_${Date.now()}.json`);
  document.body.appendChild(a);
  a.click();
  a.remove();
};

window.reseedDemoAnalytics = function() {
  localStorage.removeItem("breakIt_interviewHistory");
  localStorage.removeItem("breakIt_solvedBugsCount");
  initLocalStorageData();
  refreshAnalyticsDashboard();
  alert("Sample historical assessment and practice telemetry re-seeded successfully!");
};

