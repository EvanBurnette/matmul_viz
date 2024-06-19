Hi welcome to unboxing AI with Evan Burnette! I'm Evan Burnette.

Today we're unboxing matrix multiplication, the foundation of modern AI. So, what is matrix multiplication?

First if you'd like follow along, click the link in the description to open the interactive demo. Alright let's go!

Let's say Anna wants two bananas.
If she goes to Kroger and buys two bananas, it will cost her a TOTAL of $0.54. What did we do here?

I'm sure many of you are familiar with this operation. This is the standard multiplication we're all taught in grade school.

price times quantity = total

But, what if Anna also wants an apple? Oh man, looks like our operation broke! What should we do to fix it?

We need to get the price of an apple from Kroger as well. The length of her shopping list has to match the length of the prices list.

And what if she wants even more things? You can't blame her, it's a material world.

Then we have to get the prices of each item from Kroger. 

Then we multiply each item by it's corresponding price to get the subtotal.

Then we add these up to get the total that Anna pays to Kroger and we've just completed a dot product! What?! A dot product is a form of VECTOR multiplication.

Wait, what's a vector? How did we do a dot product without first knowing what a vector is?

I guarantee you already know what a vector is, we often learn them as arrows in 2D or 3D but in AI and Machine Learning we think of them as lists of numbers. If you've made a shopping list before, you've created a vector!

Simple right? We can write this equation a bit differently now and with a different meaning:

p→ ⋅ s→ = t

It looks almost the same but we replaced the single values with vectors. The shopping list is a column vector and the prices list is a row vector.

Notice how the total is still a simple number. We can call this a SCALAR.

Now imagine you are an entrepreneur with a brand new startup idea to help people save money on groceries. Anna is your first customer. She usually shops at Kroger but you want to help her figure out where she can shop to get the lowest price. So you look up stores in her area and for each store you make a list of prices. Notice that we now have a list of lists of prices.

Oh man that's a mouthful! If only there was a better term than list of lists. Wait there is! "MATRIX." (show keanu saying woh) Not that matrix, just the old fashioned kind.

Wow look at that! Anna's saving over $14 on her first trip to Sprouts.

These are real prices by the way!

Now we're on our way with this startup idea. We have saved our first happy customer time and money and we want to start expanding our business. So let's add another shopping list for our next customer, Bob. It looks like Bob will save money if he shops at Kroger.

Notice how our equation is now entirely written with capital letters.

P * S = T

The price matrix has 3 rows and 5 columns. AKA a 3x5 matrix. The shopping list matrix has 5 rows and 2 column. AKA a 5x2 matrix.

Now it's really starting to look like matrix multiplication! Each customer's shopping list vector is multiplied with each prices vector. Our totals represent the total each shopper will pay at each store.

Notice how our output is now a matrix.

There's no limit to the number of customers we can add to our shopping list matrix, and the work we've done makes this an automatic process now and we can easily scale our business.

Hey! Do you feel like you understand matrix multiplication better than you did a few minutes ago?

Then subscribe and ring that bell to come along with me as we unbox AI. See ya next time!




-----------------------------------------
old stuff below

(I just learned all this and they say teaching is the best way to learn. So if I've made any mistakes or if you think anything is confusing please let me know in the comments below.)

(If you're new here this is a channel where we develop intuition for AI by breaking it down piece by piece. Today we learned a very important piece. Click the subscribe button and the bell icon to stay tuned for more!)

The foundation of modern AI is matrix multiplication. Matrix multiplication in this case has created a total cost at each store based on each shopping list and each price list.

Scaled dot product attention is at the core of state of the art AI right now. Transformers transform the inputs via matrix multiplication (and some other tricks).

(We transformed our shopping lists into totals.)

(Check out 3 blue 1 brown's linear algebra series for more uses for matrices and matrix multiplication.
)
(Checkout the linked blog which this app is inspired by at BetterExplained.com.)

(We have a vertical "shopping list" vector and a horizontal "prices" vector. We multiply them together element-wise and then add them up. Our result is the total cost that Anna pays to Kroger.)

(Usually receipts are printed out vertically but for this demo we print out the subtotals horizontally which will make sense in a minute.)

(Hey if you're new here this is a channel where I try to make AI less scary by breaking it down piece by piece. Subscribe if you'd like to see more videos like this and thanks for watching!)

(Have you ever had to make a difficult decision? How could you use matrix multiplication to help you score your options?)

(We can also think of our shopping list as a data vector because it's data about what Anna wants to buy.

Likewise we can think of the prices vector as an operation vector because we want to multiply the quantities by the prices.)

(So vertical vectors are data vectors and horizontal vectors are operation vectors.)

(We add the price "p" of a banana to our total "t" "q" times. So Anna has to pay $0.27 * 2 = $0.54 when she buys 2 bananas at Kroger.)