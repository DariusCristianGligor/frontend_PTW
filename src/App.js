import Categories from "./pages/categoriesPage/categories";
import "bootstrap/dist/css/bootstrap.css";
import React, { Component, useState } from "react";
import { Route, Switch, Redirect } from "react-router";
import HomeForm from "./pages/homePage/HomeForm";
import Places from "./pages/placePage/Place";
import NotFound from "./pages/NotFound/NotFound";
import Reviews from "./pages/reviewPage/Review";
import Login from "./pages/LoginPage/Login";
import Register from "./pages/RegisterPage/Register";
import AddCAtegories from "./pages/AddCAtegoriesPage/AddCategoriesPage";
import LabelBottomNavigation from "./components/navbar2";
import AddPlace from "./pages/AddPlace/AddPlacePage";
import AddReview from "./pages/addReview/AddReviewPage";
import ShowReviews from "./pages/ShowReviews/ShowReview";
function App() {
  const [placeId, setPlaceId] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [city, setCity] = useState();
  const [selectedCategories, setSelectedCategories] = useState();
  return (
    <div>
      <LabelBottomNavigation />
      <main className="container">
        <Switch>
          <Route path="/home">
            <HomeForm
              setCity={setCity}
              setSelectedCategories={(e) => setSelectedCategories(e)}
              setSearchTerm={setSearchTerm}
            ></HomeForm>
          </Route>
          <Route path="/addcategory">
            <AddCAtegories></AddCAtegories>
          </Route>
          <Route path="/register">
            <Register></Register>
          </Route>
          <Route path="/login">
            <Login></Login>
          </Route>
          <Route path="/categories">
            <Categories></Categories>
          </Route>
          <Route path="/places">
            <Places
              setPlaceId={setPlaceId}
              searchTerm={searchTerm}
              city={city}
              selectedCategories={selectedCategories}
            ></Places>
          </Route>
          <Route path="/reviews">
            <Reviews></Reviews>
          </Route>
          <Route path="/viewreviews">
            <ShowReviews placeId={placeId}></ShowReviews>
          </Route>
          <Route path="/addreview">
            <AddReview placeId={placeId}></AddReview>
          </Route>
          <Route path="/addplace">
            <AddPlace></AddPlace>
          </Route>
          <Route path="/not-found">
            <NotFound></NotFound>
          </Route>

          <Redirect from="/" exact to="/home" />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </div>
  );
}
export default App;
