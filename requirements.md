# Requirements
## UC1
### Main scenario
1. Starts when a user wants to use the conversion tool to convert a measurement.
2. The user selects measurement type (e.g. length).
3. The user enters the quantity and selects the current unit and the unit to convert to.
4. The system performs the conversion and presents the result.
5. The user asks the system to clear inputs and the result.
6. The system performs the clearing.

### Alternative scenarios
2. The user does not select measurement type.
- The system will use a pre-selected, default type.
3. a) The user does not enter the quantity.
- The system will not perform any conversion.   
3. b) The user does not select the current unit and/or the unit to convert to.
- The system will use a pre-selected, default unit.

## UC2
### Main scenario
1. Starts when a user wants to use the conversion tool to convert several measurements of the same type into a single measurement of a certain unit.
2. The user selects measurement type (e.g. length).
3. The user enters the quantity and selects the current unit.
4. The user adds the rest of the measurements.
5. The user selects the unit to convert the measurements into. 
6. The system performs the conversion and presents the result.
7. The user asks the system to clear inputs and the result.
8. The system performs the clearing.

### Alternative scenarios
4. The user wants to remove one of the measurements.
- The user asks the system to remove the measurement.
- The system removes the measurement.

## UC3
### Main scenario
1. Starts when a user wants to use the comparison tool to compare a measurement to another measurement of the same type.
2. The user selects measurement type (e.g. length).
3. The user enters the quantity and selects the unit for measurement A, and then for measurement B.
4. The system performs the comparison and presents the result:
- is A equal to B?
- is A greater than B?
- is A less than B?
5. The user asks the system to clear inputs and the result.
6. The system performs the clearing.

### Alternative scenarios
2. The user does not select measurement type.
- The system will use a pre-selected, default type.
3. a) The user does not enter the quantity for A and/or B.
- The system will not perform any comparison.
3. b) The user does not select the current unit.
- The system will use a pre-selected, default unit.

## UC4
### Main scenario
1. Starts when a user wants to use the comparison tool to compare several measurements of the same type as a whole to other measurements.
2. The user selects measurement type (e.g. length).
3. The user enters the quantity and selects the unit for the first measurement of group A.
4. The user adds one or several more measurements to the group.
5. The user performs step 3 and 4 for group B.
6. The system performs the comparison and presents the result:
- is A equal to B?
- is A greater than B?
- is A less than B?
7. The user asks the system to clear inputs and the result.
8. The system performs the clearing.

### Alternative scenarios
4. The user wants to remove one of the measurements.
- The user asks the system to remove the measurement.
- The system removes the measurement.