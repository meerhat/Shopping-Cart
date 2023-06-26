import React from "react";
import { CartState } from "../context/Context";
import { Button, ListGroup, Row, Col, Form, Image } from "react-bootstrap";
import { useState } from "react";
import { useEffect } from "react";
import Rating from "./Rating";
import { AiFillDelete } from "react-icons/ai";

const Cart = () => {
  const {
    state: { cart },
    dispatch,
  } = CartState();

  const [total, setTotal] = useState();

  useEffect(() => {
    setTotal(
      cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0)
    );
  }, [cart]);

  return (
    <div className="home">
      <div className="productContainer">
        <ListGroup>
          {cart.map((prod) => (
            <div className="cartCheckout">
              <ListGroup.Item key={prod.id} style={{background:"black", color:"white", borderBlockColor:"white"}}>
                <Row>
                  <Col md={2}>
                    <Image src={prod.image} alt={prod.name} fluid rounded />
                  </Col>
                  <Col md={2}>
                    <span>{prod.name}</span>
                  </Col>
                  <Col md={2}>
                    <span>${prod.price}</span>
                  </Col>
                  <Col md={2}>
                    <Rating rating={prod.ratings} />
                  </Col>

                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={prod.qty}
                      onChange={(e) =>
                        dispatch({
                          type: "CHANGE_CART_QTY",
                          payload: {
                            id: prod.id,
                            qty: e.target.value,
                          },
                        })
                      }
                    >
                      {[...Array(prod.inStock).keys()].map((x) => (
                        <option key={x + 1}>{x + 1}</option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      variant="light"
                      onClick={() =>
                        dispatch({
                          type: "REMOVE_FROM_CART",
                          payload: prod,
                        })
                      }
                    >
                      <AiFillDelete fontSize={20} />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            </div>
          ))}
        </ListGroup>
      </div>
      <div className="filters summary">
        <span className="title">Subtotal ({cart.length}) items</span>
        <span style={{ fontSize: 25, fontWeight: 10 }}>Total: ${total}</span>
        <Button disabled={cart.length === 0}>Proceed to Chekout</Button>
      </div>
    </div>
  );
};

export default Cart;
