# TODO
P0:
1. Make it work on mobile (i.e. add touch controls)
1. Draw arrow vector notation over the equation when only vectors (i.e. the data is 1 col and the ops are 1 row)
1. Draw lowercase letters when only scalar multiplication and change s to q
1. Draw uppercase notation when showing matrix multiplication.
1. Add storytelling or use program in a blog style article with the program as interactive puzzles with storytelling
1. Add license
1. Contact 3B1B and Better Explained and show them the demo (try to find other networking opportunities as well)

P1:
1. Refactor matrix names to align with the names shown in the app ie totals, shopping lists, prices
1. Report zero width character broken for emojis on chrome canvas
1. Flash the background of the button to aid intuition
1. Add more colors using HSL so that we can have more visual signals for the user
1. Fade other connections to 50% opacity while visualizing a single output cell
1. Create retrospective video
1. Allow users to select first the data vector then the operation row to get the result matrix cell (perhaps this could be a mode for the instructional/blog/story version)
1. Animate the drawing of the graph
1. Highlight the inputs and outputs on hover?
1. Remove and replace janky centering text with canvas baseline?
1. Add a cooler background

## Done
1. figure out why operations matrix is so small and make it consistently sized with the rest of the matrices
1. Add rectangles around every data vector and operation vector
1. Create node data structure for each cell of the matrix
    1. value
    1. parents
1. Create graph version of matmul
1. Show the blue data flowing into the orange operations (this feature was working in an earlier version but now it is broken)
1. Realign matrices to grid
1. Add buttons to program
1. Allow user to select output cell to visualize
1. Fix selection flash on mobile
1. Click on an output cell to see only all of it's up upstream dependencies
1. Allow user to select shopper columns to calculate the whole output column
1. Make vector outlines consistently colored (right now they start out as translucent white and then turn opaque white)
1. Columns and rows when setting in data matrix are not working right. (Was wrong order in function call: trimMatrix(matrix, rows, cols) vs trimMatrix(matrix, cols, rows))
1. Ship it!
1. Draw fewer emoji labels when matrices are smaller
1. Make the connection lines begin and end in places that allow the eye to more easily trace them
1. figure out how to change pointer css based on coords in canvas
1. resize from the outer edges of the input matrices
    - make matrices editable
    - when the size of a matrix changes, recompute result and redraw
        - There are many ways to approach this and here's a short list:
            1. Use global "resizing" var like in the reference app (would this be okay with 2 resizable matrices?)
                - could use a var in the matrix object to say when it's being resized
            1. Use a callback function so that when a matrix updates itself, it can redraw the whole app (object oriented)
            1. Redraw the screen at a high refresh rate so that any changes are instantly reflected (but this would require changes to the way that connections are drawn)
            1. Add a reactive framework (like svelte) to help manage state
            1. Add an event listener on click from the hover handler and remove it on mouse up per resizable component matrix
        - Get the resizing working on just one matrix first
1. Brand the app at the top so people can share it more easily
1. Add the written version of the computation like "P * S = R" and/or "Ops * Data = Results"
1. Highlight the lowest price for each shopper
1. Highlight broken matchup between number of fruits in lists and number of prices at stores
1. Highlight minvals with green outline or something
1. Put X emoji at the end of the broken connections
1. Center the app vertically in the browser
1. Change name of result to totals
1. ADD VOICEOVER TO VIDEO DESCRIBING THE SIZE OF THE OUTPUT MATRIX 3X2
1. Fix app so the bottom of the screen is available
1. Create Demo video
    1. Balance Audio
    1. Add matrix and other memes
    1. Add text overlays

## Not necessary
1. We want to swap the handles that allow the user to resize the matrices
    - Each handle should actually control the perpendicular axis (sounds wrong but it's the intuitive way to do it)