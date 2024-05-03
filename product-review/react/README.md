## Product Review 

To be coded in 2.5 hrs
Implement a “Product Review” workflow for Flipkart. As part of this exercise, you will be provided with a set of products that can be assumed to be the users’ purchase history. You are expected to choose any of the products and initiate a product review process.

Product mocks and api was given...

### Product Features

1. The app features a list of products that can be assumed to have been purchased by the user.
2. The user should be able to select a product from the list and begin providing the review for the same
3. The review screen appears splitting the list page into a 2 column UI with the products list on the left and the review screen on the right
4. Users can provide reviews for products via a multi step form wizard which has 2 steps
- First step takes in the rating for the product
- Second step highlights the rating (from #1) and takes in the detailed review text
(limited to 100 characters)
- You can move either forward or backward depending on your current step in the
form (indicated by the NEXT/PREVIOUS buttons)
5. The second step also has a submit button that stores the rating/review into
LocalStorage against the product.
Must Haves
6. Render the purchased product list using the API
- a. Loading state should be rendered while the API is inflight
- b. Error state should render in case the API fails, with a Retry button to re-initiate
the API call
7. Clicking on any product should show the review screen
The review screen should have following validations (and error states) implemented:
- a. User should not be allowed to move to step 2 if rating is not provided
- b. User should not be allowed to submit, if review is not provided or if the review
text is more than 100 characters long
- c. You can move either forward or backward depending on your current step in the
form (indicated by the NEXT/PREVIOUS buttons)



### Good to Have

1. Clicking on Submit button at Step 2 should
- a. save the rating/review into LocalStorage
- b. return to the products list screen and a toast should be displayed, at the bottom,
with the message “Review for product submitted successfully”
2. If an existing review/rating exists, in LocalStorage, for a product the same should be
loaded on clicking the product from the list
3. Review text character count

### Points to consider:
- Focus on the modularity of code and design of the solution. Keep performance of the application in mind.
- The solution could be coded in any view framework of your choice e.g. React, Vue, Angular etc or vanilla JS as well. Please refrain from using any plugins / libraries like Axios, jQuery or css frameworks like Tailwind, Bootstrap/Material UI. However, you can (and are encouraged to) use tooling such as webpack, grunt, gulp, etc.
- The final solution should work without errors.
- Do not completely ignore the layout / visual design. A minimalist visual design /
layout must be followed, it is also important for us to evaluate your CSS knowledge.
- Do not create a div soup instead, use semantic HTML tags
- Please ONLY use the assets provided in the mocks folder
