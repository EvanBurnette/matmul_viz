hi welcome to unboxing AI with Evan

Burnette I'm your host Evan Burnette
what's in the box? matrix
multiplication
but before we get started click the link in the description so you can follow along with me
all right let's go
let's say Anna wants two bananas
if she goes to Kroger and buys
two bananas it will cost her a total of
54
How do we know this?
"you can read minds" (Zoolander meme)
No
"what is this?" (Zoolander meme)
It's just grade school multiplication
And multiplication is just repeated adding
price * quantity equals total

but what if Anna also wants an apple? oh man looks like our operation
broke what should we do to fix it?
we need to get the price of an apple from Kroger as well
the length of her shopping list has to match the length of the prices list
and what if she wants even more things?
you can't blame her
it's a material world
then we have to get the prices of
each item from Kroger
then we multiply
each item by its corresponding price to
get a subtotal then we add these
subtotals up to get the total that Anna
pays to Kroger and we've just completed
a DOT product
huh?
a DOT product is a
form of vector
multiplication
huh?
wait what's a vector?
what's our Vector Victor
how did we do a DOT product without first knowing what a
vector is?
I guarantee you already know
what a vector is we often learn them as
arrows in 2D or 3D but in Ai and machine
machine learning we think of them as
lists of numbers
if you've made a shopping list before you've created a
vector. simple right? we can write this
equation a bit differently now to represent this dot-product
P Arrow * S Arrow equals T
it looks almost the same but we
replace the single values with vectors
the shopping list is a column vector and
the prices list is a row
but the total is still a
simple number called a scaler
now imagine you're an entrepreneur with a
brand new startup idea to help people
save money on groceries Anna is your
first customer she usually shops at
Kroger but you want to help her figure
out where she can shop to save the most
money so you look up stores in her area
and for each store you make a list of
prices
notice that we now have a list of
list of prices oh man that's a mouthful
if only there was a better term than
list of lists wait there is the
Matrix not that Matrix just the
oldfashioned
So Anna is saving over $14 on her first
trip to Sprouts and these are real prices by
the way
now we're on our way with this
startup idea we have saved our first
happy customer time and money and we
want to start expanding our business so
let's add another shopping list for our
next customer Bob it looks like Bob will
save money if he shops at Kroger
notice
how our equation is now entirely written
written with capital letters, each representing a different matrix
P * S = T
prices * shopping lists equals
totals the price Matrix has three rows
and five columns AKA a 3x5 Matrix the
shopping list Matrix has five rows and
two columns AKA a 5x2 matrix notice how
our output is now a matrix it has three
rows and two columns AKA a 3x2 matrix
matrix now it's really starting to look
like a matrix
multiplication each customer shopping
list Vector is Multiplied with each
prices Vector our totals represent the
total each Shopper will pay at each
store there's no limit to the number of
customers we can add to our shopping
list Matrix and the work we've done
makes this an automatic process and we
can easily scale our
business hey do you feel like you
understand matrix multiplication better
than you did a few minutes ago then
subscribe and ring that Bell to come
along with me as we unbox AI see you
next time