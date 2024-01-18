
Consider a function with 4 boolean inputs and 1 boolean output. It can be described by a lookup table. There as 2^16=65536 such functions.

A  | B | C | D | OUT
---|---|---|---|---
0  |0  |0  |0  |1  
0  |0  |0  |1  |1  
0  |0  |1  |0  |1  
0  |0  |1  |1  |1  

0  |1  |0  |0  |1  
0  |1  |0  |1  |1  
0  |1  |1  |0  |0  
0  |1  |1  |1  |0  

1  |0  |0  |0  |0  
1  |0  |0  |1  |0  
1  |0  |1  |0  |1  
1  |0  |1  |1  |1  

1  |1  |0  |0  |1  
1  |1  |0  |1  |0  
1  |1  |1  |0  |0  
1  |1  |1  |1  |1  

We can also write a boolean expression (see [script](./js/possibility-cut-function-example.js):
```
(NOT A AND NOT B) OR (A XOR B AND A EQ C) OR (A AND B AND C EQ D)
```

Now let's see if we can chop this function up into one (A,B)-dependent part and one (C,D)-dependent part.
```
(A,B)=00 -> 1111 "true"
(A,B)=01 -> 1100 "NOT C"
(A,B)=10 -> 0011 "C"
(A,B)=11 -> 1001 "C XOR D"
```
and
```
(C,D)=00 -> 1101 "NOT B OR A"
(C,D)=01 -> 1100 "NOT A"
(C,D)=10 -> 1010 "NOT B"
(C,D)=11 -> 1011 "NOT A OR B"
```

The idea of 'possibility cut' is to see how many possibilities there are left in the second part once the first part is determined (how complex the expression is in the remaining variable). Or rather, how many possibilties from the first set you need to distinguish apart from the valuations in the second set.

If you consider the function (A and B and C and D) then there are two relevant possibilities to value A and B (00/01/10 vs 11) and in the first case the expression in C and D becomes "false" and in the second case it reduces to "C and D".

Possibility cut in 3-SAT and similar problems defines how much information needs to be carried from a sub solution to the remaining parts. By proving that the possibility cut is exponential in the size of the sub solution, it might be possible to prove that there is no way to chop up the problem into smaller problems, because the information size of the relevant output of these sub-calculations would be too large.