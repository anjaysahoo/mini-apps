import PropTypes from "prop-types";
import classes from "./review.component.module.css";
import star from "../../assets/star.svg";
import emptyStar from "../../assets/empty-star.svg";
import {useEffect, useRef, useState} from "react";

const STAR_COUNT = 5;

function ReviewComponent({activeProduct}) {
    const [isRatingSectionActive, setIsRatingSectionActive] = useState(true);
    const [filledStarCount, setFilledStarCount] = useState(0);
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
    const [reviewTextValue, setReviewTextValue] = useState("");
    const reviewText = useRef("");
    const [isSummarySectionActive, setIsSummarySectionActive] = useState(false);

    function updateFilledStarCount(position, isFromFilledStarRow){
        const newFilledStarCount = (isFromFilledStarRow ? 0 : filledStarCount) + position + 1;
        setFilledStarCount(newFilledStarCount)
    }

    function reviewChangeHandler(event){
        reviewText.current = event.target.value;
        setReviewTextValue(event.target.value);
        updateIsSubmitDisabled(reviewText.current);
    }

    function updateIsSubmitDisabled(newReviewText){
        // console.log("newReviewText ", newReviewText.length);
        if(!newReviewText || newReviewText.length >= 100){
            setIsSubmitDisabled(true);
        }
        else{
            setIsSubmitDisabled(false);
        }
    }

    function submitHandler(event){
        event.preventDefault();
        const currentReviewsLSValue = JSON.parse(localStorage.getItem("REVIEWS_BY_ORDER_ID")) || {};
        currentReviewsLSValue[activeProduct.orderId] = {
            rating: filledStarCount,
            reviewText: reviewText.current
        }

        localStorage.setItem("REVIEWS_BY_ORDER_ID", JSON.stringify(currentReviewsLSValue));

        setIsSummarySectionActive(true);
    }

    useEffect(() => {
        console.log("use effect called")
        const currentReviewsLSValue = JSON.parse(localStorage.getItem("REVIEWS_BY_ORDER_ID"));

        if(currentReviewsLSValue && currentReviewsLSValue[activeProduct.orderId]){
            console.log("currentReviewsLSValue[activeProduct.orderId] : ", currentReviewsLSValue[activeProduct.orderId]);
            setIsSummarySectionActive(true)
            setFilledStarCount(currentReviewsLSValue[activeProduct.orderId].rating);
            setReviewTextValue(currentReviewsLSValue[activeProduct.orderId].reviewText);
        }
        else{
            setIsRatingSectionActive(true);
            setIsSummarySectionActive(false);
            setFilledStarCount(0);
            setReviewTextValue("");
            reviewText.current = "";
        }

    }, [activeProduct]);



    return (
        <>
            <section className={classes["review"]}>
                <header className={classes["review__header"]}>
                    <img
                        src={activeProduct.imageURL}
                        className={classes["review__header__image"]}
                        alt={activeProduct.title}
                    />
                    <div className={classes["review__header__name"]}>
                        {activeProduct.title}
                    </div>
                </header>
                {
                    !isSummarySectionActive &&
                    <form
                        onSubmit={submitHandler}
                        className={classes["review__main"]}>
                        {
                            isRatingSectionActive &&
                            <section className={classes["review__main__item"]}>
                                <div className={classes["review__main__item__heading"]}>
                                    Rate this product
                                </div>
                                <div className={classes["review__main__item__star"]}>
                                    {Array(filledStarCount).fill(null).map((_, index) => (
                                        <img
                                            onClick={() => updateFilledStarCount(index, true)}
                                            key={index}
                                            src={star}
                                            alt="filled star"/>
                                    ))}
                                    {Array(STAR_COUNT - filledStarCount).fill(null).map((_, index) => (
                                        <img
                                            onClick={() => updateFilledStarCount(index, false)}
                                            key={index}
                                            src={emptyStar}
                                            alt="empty star"/>
                                    ))}
                                </div>
                                <div className={classes["review__main__item__action"]}>
                                    <button
                                        onClick={() => setIsRatingSectionActive(false)}
                                        disabled={filledStarCount === 0}
                                        className={classes["review__main__item__action__next"]}>Next
                                    </button>
                                </div>
                            </section>
                        }
                        {
                            !isRatingSectionActive &&
                            <section className={`${classes["review__main__item"]}`}>
                                <div className={classes["review__main__item__heading"]}>
                                    Review this product
                                </div>
                                <textarea
                                    onChange={reviewChangeHandler}
                                    value={reviewTextValue}
                                    name="comment"
                                    id="comment"
                                    cols="30"
                                    rows="10"
                                    className={classes["review__main__item__text-area"]}
                                ></textarea>
                                <div className={classes["review__main__item__action"]}>
                                    <button
                                        onClick={() => setIsRatingSectionActive(true)}
                                        className={classes["review__main__item__action__prev"]}>Previous
                                    </button>
                                    <button
                                        disabled={isSubmitDisabled}
                                        className={classes["review__main__item__action__submit"]}>Submit
                                    </button>
                                </div>
                            </section>
                        }

                    </form>
                }
                {
                    isSummarySectionActive &&
                    <div className={classes["review__main"]}>
                        <section className={`${classes["review__main__item"]}`}>
                            <div className={classes["review__main__item__heading"]}>
                                Review Summary
                            </div>
                            <div
                                className={classes["review__main__item__star"]}
                                >
                                {Array(filledStarCount).fill(null).map((_, index) => (
                                    <img
                                        style={{cursor: "default"}}
                                        key={index}
                                        src={star}
                                        alt="filled star"/>
                                ))}
                                {Array(STAR_COUNT - filledStarCount).fill(null).map((_, index) => (
                                    <img
                                        style={{cursor: "default"}}
                                        key={index}
                                        src={emptyStar}
                                        alt="empty star"/>
                                ))}
                            </div>
                            <div className={classes["review__main__item__text"]}>
                                {reviewTextValue}
                            </div>
                            <i><b>“Review for product submitted successfully”</b></i>
                        </section>
                    </div>
                }

            </section>
        </>
    )
}

ReviewComponent.propTypes = {
    activeProduct: PropTypes.object.isRequired,
}

export default ReviewComponent;
