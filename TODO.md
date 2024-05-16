# TODO
P0:
1. Allow user to select output cell to visualize
1. Allow user to select shopper columns to calculate the whole output column
1. Make the connection lines begin and end in places that allow the eye to more easily trace them
1. resize from the outer edges of the input matrices
    - figure out how to change pointer css based on coords in canvas
1. Click on an output cell to see only all of it's up upstream dependencies
1. Add storytelling to program

P1:
1. Flash the background of the button to aid intuition
1. Add more colors using HSL so that we can have more visual signals for the user
1. Fade other connections to 50% opacity while visualizing a single output cell
1. Create Demo video
1. Create retrospective video
1. Make it work on mobile (i.e. touch controls)


## Done
1. figure out why operations matrix is so small and make it consistently sized with the rest of the matrices
1. Add rectangles around every data vector and operation vector
1. Create node data structure for each cell of the matrix
    1. value
    1. parents
    1. 
1. Create graph version of matmul
1. Show the blue data flowing into the orange operations (this feature was working in an earlier version but now it is broken)
1. Realign matrices to grid
1. Add buttons to program

## Not necessary
1. We want to swap the handles that allow the user to resize the matrices
    - Each handle should actually control the perpendicular axis (sounds wrong but it's the intuitive way to do it)