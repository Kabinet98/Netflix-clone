import { useEffect, useState } from "react";
import "../Css/Plan.css";
import db from "../Firebase";
import { userSelector } from "./UserSlice";
import { loadStripe } from "@stripe/stripe-js";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useSelector } from "react-redux";
const Plans = () => {
  const [loading, setLoading] = useState(false);
  const [subscription, setSubscription] = useState(null);
  const user = useSelector(userSelector);

  useEffect(() => {
    db.collection("customers")
      .doc(user.uid)
      .collection("subscriptions")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(async (subscription) => {
          setSubscription({
            role: subscription.data().role,
            current_period_end: subscription.data().current_period_end.seconds,
            current_period_start: subscription.data().current_period_start
              .seconds,
          });
        });
      });
  }, [user.uid]);

  const loadcheckout = async (priceId) => {
    const docRef = await db
      .collection("customers")
      .doc(user.uid)
      .collection("checkout_sessions")
      .add({
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      });
    setLoading(true);
    docRef.onSnapshot(async (snap) => {
      const { error, sessionId } = snap.data();
      if (error) {
        // Show an error to your customer and
        // inspect your Cloud Function logs in the Firebase console.
        alert(`An error occured: ${error.message}`);
      }
      if (sessionId) {
        // We have a session, let's redirect to Checkout
        // Init Stripe
        const stripe = await loadStripe(
          "pk_test_kRddemrrQljGGntSrffpOMsa00iCB5dfQ2"
        );
        stripe.redirectToCheckout({ sessionId });
      }
    });
  };

  const [products, setProducts] = useState([]);
  useEffect(() => {
    db.collection("products")
      .where("active", "==", true)
      .get()
      .then(function (querySnapshot) {
        const product = {};
        querySnapshot.forEach(async function (doc) {
          product[doc.id] = doc.data();
          const priceSnap = await doc.ref.collection("prices").get();
          priceSnap.docs.forEach((price) => {
            product[doc.id].prices = {
              priceId: price.id,
              priceData: price.data(),
            };
          });
        });
        setProducts(product);
      });
  }, []);
  console.log(products);
  console.log(subscription);
  return (
    <div className="plans">
      {subscription && (
        <div>
            <h3>Current Plan:{subscription?.role} </h3>
          <p style={{ padding: "3px 0px" }}>
            Renewal date:
            {new Date(
              subscription?.current_period_end * 1000
            ).toLocaleDateString()}{" "}
          </p>
        </div>
      )}
      {Object.entries(products).map(([productId, productData]) => {
        const isCurrentPackage = productData.name
          ?.toLowerCase()
          .includes(subscription?.role);
        return (
          <div className="profile__plan" key={productId}>
            <div className="profile__plansInfo" style={{ flex: ".8" }}>
              <h5>{productData.name} </h5>
              <h6>{productData.description} </h6>
            </div>
            <button
              onClick={() =>
                !isCurrentPackage && loadcheckout(productData.prices.priceId)
              }
            >
              {isCurrentPackage ? "Current Plan" : "Subscribe"}
            </button>
            {loading ? (
              <div className="progress" style={{ marginLeft: "2px" }}>
                <CircularProgress />
              </div>
            ) : (
              <div
                className="progress"
                style={{ marginLeft: "2px", display: "none" }}
              >
                <CircularProgress />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
export default Plans;
