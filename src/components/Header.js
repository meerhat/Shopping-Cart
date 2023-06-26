import React from "react";
import { Nav, Badge, Container, Dropdown, FormControl, Navbar, Button } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa"
import { AiFillDelete, AiFillShopping } from "react-icons/ai";
import { Link } from "react-router-dom";
import { CartState } from "../context/Context";
import "./HomePageStyles.css";

const Header = () => {
  const {
    state: { cart },
    dispatch,
    productDispatch,
  } = CartState();

  return (
    <Navbar style={{background:"black"}}>
      <Container>
        <Navbar.Brand style={{color:"white"}}>
          <div className="heading">
          <Link to="/">Shopping Cart</Link>
          <AiFillShopping style={{width:40, marginBottom:5}} fontSize={25}/>
          </div>
        </Navbar.Brand>
        <Navbar.Text className="search">
          <FormControl
            style={{ width: 500 }}
            placeholder="Search product here"
            className="m-auto" 
            onChange={(e) => {
              productDispatch({
                type: "FILTER_BY_SEARCH",
                payload: e.target.value,
              })
            }}
          ></FormControl>
        </Navbar.Text>
        <Nav>
            <Dropdown alignRight>
                <Dropdown.Toggle style={{background: "green", borderColor:"transparent"}}>
                    <FaShoppingCart color="white" fontSize={25}/>
                    <Badge>{cart.length}</Badge>
                </Dropdown.Toggle>
                <Dropdown.Menu style={{minWidth: 370}}>
                {cart.length > 0 ? (
                <>
                  {cart.map((prod) => (
                    <span className="cartitem" key={prod.id}>
                      <img
                        src={prod.image}
                        className="cartItemImg"
                        alt={prod.name}
                      />
                      <div className="cartItemDetail">
                        <span>{prod.name}</span>
                        <span>₹ {prod.price.split(".")[0]}</span>
                      </div>
                      <AiFillDelete
                        fontSize="20px"
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          dispatch({
                            type: "REMOVE_FROM_CART",
                            payload: prod,
                          })
                        }
                      />
                    </span>
                  ))}
                  <Link to="/cart">
                    <Button style={{ width: "95%", margin: "0 10px", background:"green", borderColor:"transparent"}}>
                      Go To Cart
                    </Button>
                  </Link>
                </>
              ) : (
                <span style={{ padding: 10 }}>Cart is Empty!</span>
              )}
                    
                </Dropdown.Menu>

            </Dropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
