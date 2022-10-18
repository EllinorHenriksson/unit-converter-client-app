# Test specification
## Testsuite 1
### TC1.1 Successfully convert one measurement
#### Input
- Reload the page
- Click on the convert link in the navbar
- Select measurement type ``weight``
- Type in ``1`` in the quantity field and select ``hg`` as current unit.
- Select ``g`` as the unit to convert to

#### Output
- Watch the result, wich should be ``100``

## Testsuite 2
### TC2.1 Successfully convert several measurements
#### Input
- TC1.1
- Click on the add symbol to add a second measurement
- Type in ``50`` and select ``g``
- Add a third measurement
- Type in ``1`` and select ``kg``

#### Output
- Watch the result, wich should be ``1150``

### TC2.2 Successfully remove a measurement
#### Input
- TC2.1
- Click on the remove symbol of the third measurement

#### Output
- The measurement is removed
- The result is recalculated

## Testsuite 3
### TC3.1 Successfully clear the converter
#### Input
- TC2.1
- Click on the ``Clear`` button

#### Output
- All measurements are removed
- A new default measurement is automatically added
- The unit to convert to is automatically seleced to the default unit ``kg`` 
- The result is reset

## Testsuite 4
### TC4.1 Successfully compare two measurements that are equal
#### Input
- Reload the page
- Click on the compare link in the navbar
- Select measurement type ``time``
- In the measuremenmt group A, type in ``1`` in the quantity field and select ``min`` as current unit.
- In the measurement group B, type in ``60`` and select ``s``.

#### Output
- Watch the result, wich should be ``A = B``

### TC4.2 Successfully compare two measurements where A > B
#### Input
- Reload the page
- Click on the compare link in the navbar
- Select measurement type ``time``
- In the measuremenmt group A, type in ``2`` in the quantity field and select ``min`` as current unit.
- In the measurement group B, type in ``60`` and select ``s``.

#### Output
- Watch the result, wich should be ``A > B``

### TC4.3 Successfully compare two measurements where A < B
#### Input
- Reload the page
- Click on the compare link in the navbar
- Select measurement type ``time``
- In the measuremenmt group A, type in ``1`` in the quantity field and select ``min`` as current unit.
- In the measurement group B, type in ``120`` and select ``s``.

#### Output
- Watch the result, wich should be ``A < B``

## Testsuite 5
### TC5.1 Successfully compare two groups of measurements where A = B
#### Input
- TC4.1
- In the measurement group A, click on the add symbol and add a second measurement
- Type in ``1`` and select ``h``
- In the measurement group B, click on the add symbol and add a second measurement
- Type in ``60`` and select ``min``

#### Output
- Watch the result, wich should be ``A > B``

### TC5.2 Successfully compare two groups of measurements where A > B
#### Input
- TC4.1
- In the measurement group A, click on the add symbol and add a second measurement
- Type in ``2`` and select ``h``
- In the measurement group B, click on the add symbol and add a second measurement
- Type in ``60`` and select ``min``

#### Output
- Watch the result, wich should be ``A > B``

### TC5.3 Successfully compare two groups of measurements where A < B
#### Input
- TC4.1
- In the measurement group A, click on the add symbol and add a second measurement
- Type in ``1`` and select ``h``
- In the measurement group B, click on the add symbol and add a second measurement
- Type in ``120`` and select ``min``

#### Output
- Watch the result, wich should be ``A < B``

### TC5.4 Successfully remove a measurement
#### Input
- TC5.1
- Click on the remove symbol of the second measurement in group B

#### Output
- The measurement is removed
- The result is recalculated

## Testsuite 6
### TC6.1 Successfully clear the comparer
#### Input
- TC5.1
- Click on the ``Clear`` button

#### Output
- All measurements are removed
- A new default measurement is automatically added for each group (A and B)
- The result is reset