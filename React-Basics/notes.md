**PROPs**
props or properties are used to transfer data from one component to another

prop can be anything

1. string
2. boolean
3. numbers
4. complex props etc

-> Remember that props are never to be changed by the child components but rather read-only.

**State Hooke**
State is like react component's brain, it can hold information that can change over time.

state change is not persistant across browser reload
state is just another hooke

-> only mutate the state using the setter function
**hookes**
hooke are basically special functions in react that let us tap into special features of react example:

1. useState for state management
2. useEffect for side effects like data fetching
   etc..

**useEffect**
usually used to protray some side effects of an action like cleaning up the code after removing a component etc..

useEffect runs twice on developement mode/ strict mode, as a stress test to make sure our logic runs properly, however in actual deployement mode it only runs once
