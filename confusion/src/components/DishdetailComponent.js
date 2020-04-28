import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Media, Breadcrumb, BreadcrumbItem,
	Button, Modal, ModalHeader, ModalBody, Label, Row, Col	} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

    function RenderDish({dish}) {
		if (dish != null)
            return(
                <Card>
                    <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                    <CardBody>
                      <CardTitle>{dish.name}</CardTitle>
                      <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        else
            return(
                <div></div>
            );
    }

	function RenderComments({comments, postComment, dishId}) {
		if(dish!=null){
			const comments = dish.comments.map((comments) => {
            return (
              <div key={comments.id} className="col-12 mt-5">
                <Media tag="li">
                  <Media body className="ml-5">
                   <p>{comments.comment}</p>
				   <p>--{comments.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comments.date)))}</p>
                  </Media>
                </Media>
              </div>
            );
			});
		return(
			<div className="container">
				<div className="row">
				  <h4>Comments:</h4>	
				  <Media list>
					  {comments}
				  </Media>
				</div>
			</div>
			);
		}
			
		else
			return(<div></div>);
    }

    const  DishDetail = (props) => {
		if (props.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMess) {
            return(
                <div className="container">
                    <div className="row">            
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if (props.dish != null) {		
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
							<RenderDish dish={props.dish} />
						</div>
						<div className="col-12 col-md-5 m-1">
							<RenderComments comments={props.comments}
								addComment={props.addComment}
								postComment={props.postComment}
								dishId={props.dish.id}
							/>
							<CommentForm dishId={dishId} postComment={postComment} />
						</div>
					</div>
                </div>
            );
		}
		else
			return(<div></div>);
    }

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
		this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
		this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
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

export default DishDetail;