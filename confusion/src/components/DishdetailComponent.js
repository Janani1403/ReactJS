import React from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle } from 'reactstrap';
import { Media } from 'reactstrap';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
    function RenderDish({dish}) {
		if (dish != null)
            return(
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
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

    function RenderComments({dish}) {
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
		if(props.dish !=null)
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
                        <RenderComments comments={props.comments} />
                    </div>
                </div>
                </div>
            );
		else
			return(<div></div>);
    }

export default DishDetail;