---
layout: post
title: Solutions provided by ada
category: Scrap
author: Cliff Hammett

excerpt:
thumbimg: thumb_sc_solutionsprovbyada.jpg
thumbalt: Fragment of original censorship process
headerimg: disp_sc_solutionsprovbyada.jpg
headeralt: Final two pages from censorship process to create poem


---

_A [censorship poem](http://www.everypoet.org/pffa/showthread.php?77841-Jon-s-Serious-Try-Me-Outs&p=567558#post567558), using the 'Exception Handling in Ada' section of a guide to programming as a starting point_

```
1. a predefined exception:
trapped and raised by the underlying run time machine
error: failure of a run-time check on constraint
				zero right of a division
	error: failure of a run-time check on language
				normally a return statement transmits
				back to the caller this does not happen 
	error: failure of a run-time check on memory
				raised by invocation
	error: failure of a run-time check on the system

raise Help

begin
	when raised by division
		that is neither help nor constraint

end
	control transferred immediately to handler
	follow the point the exception is executed
	the program continues as if raised
		normally

from the point after end
exception is propagated
the effect depends on the exception:

	if its termination reraises the exception
		if its termination causes routine to return
			if a body terminates abnormally
				it is further propagated
				and might eventually lead
				to the end of the program

1.1. Ada raises an exception:
an exception is raised
	a check is performed to block an exception
	a handler is found
		the handler is executed
		exceptions are raised execution continues
		exception is propagated
	execution is abandoned
processing continues normally in the body
handlers are provided by procedure
eventually the program terminates abnormally

2. model of Ada's handling:
each declared exception 
can be bound in an internal exception
the internal name should distinguish 
between two identically named exceptions 
in different scopes
at run-time binding is dynamic 
a chain of activations
each contains:
	the internal exception name
	a pointer to the body
when raised its internal name is used
control is transferred to the body
the search is continued

by unwinding the dynamic chain an exception 
can be propagated outside its scope
handled by a catch-all handler
the rules of language
ensure it can be handled
by the same internal names
```
