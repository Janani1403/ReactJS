import React, { Component } from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem
} from 'reactstrap';


import {
    Button, Modal, ModalHeader, ModalBody, Label, Row, Col
} from 'reactstrap';

import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isNavOpen: false,
            isModalOpen: false

        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleLogin = this.handleLogin.bind(this);

    }

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });


    }
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }
    handleLogin(event) {
        this.toggleModal();
    }
    handleSubmit(values) {
        alert('Current State is: ' + JSON.stringify(values));
    }

    render() {

        return (
            <div>
                <Button color="secondary" onClick={this.toggleModal} > <i className="fa fa-pencil fa-lg"></i> Submit Comment</Button>

                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)} >

                            <Row>
                                <Label htmlFor="rating" md={5}>Rating</Label>
                                <Col md={{ size: 12, offset: 0 }}>
                                    <Control.select model=".rating" name="rating" id="rating"
                                        className="form-control">
                                        <option> 1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>


                            <Row className="form-group">
                                <Label htmlFor="author" md={5}>First Name</Label>
                                <Col md={12}>
                                    <Control.text model=".author" id="author" name="author"
                                        placeholder="First Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="comment" md={5}>Comment</Label>
                                <Col md={12}>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="6"
                                        className="form-control" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{ size: 10, offset: 0 }}>
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>

                        </LocalForm>

                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

function SelectedDish({ sDish }) {

    return (
        <Card>
            <CardImg width="100%" src={sDish.image} alt={sDish.name} />
            <CardBody className="m-1">
                <CardTitle>{sDish.name}</CardTitle>
                <CardText>{sDish.description}</CardText>
            </CardBody>
        </Card>
    );
}

function SelectComments({ com }) {
    return (
        <div key={com.id} className="m-2">
            <li>{com.comment}</li>
            <li className="list-inline-item">--{com.author}</li>
            <li className="list-inline-item"> ,{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(com.date)))}</li>
        </div>
    )
}




const DishDetails = (props) => {
    const dishdetails = props.dish;
    console.log(dishdetails);
    if (dishdetails != null) {
        const menu = props.comments.map((dish) => {
            return (
                <SelectComments com={dish} />
            );
        });
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>

                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <SelectedDish sDish={dishdetails} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <ul className="list-unstyled">
                            <li>Comments</li>
                            {menu}
                        </ul>
                        <CommentForm />
                    </div>
                </div>
            </div>
        );
    }
    else {
        return (
            <div></div>
        )
    }

}
export default DishDetails;
