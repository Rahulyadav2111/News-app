import React from "react";
import { useState } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import useNewsData from "../hooks/useNewsData";
import CustomPagination from "./customPagination";

const Newslist = (props) => {
  const { category, searchTerm } = props; //destructuring
  const pageSize = 4;
  const onPageChange = (pageNumber) => setcurrentPage(pageNumber);
  const [currentPage, setcurrentPage] = useState(1);
  const { newsData, loading, error } = useNewsData(category, searchTerm);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  const totalArticles = newsData.length;
  const totalPages = Math.ceil(totalArticles / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentArticles = newsData.slice(startIndex, endIndex);
  return (
    <Container>
      <Row>
        {currentArticles?.map((article) => (
          <Col xs={12} md={6} lg={4} key={article.url}>
            <Card>
              <Card.Img src={article.image} variant="top" />
              <Card.Body>
                <Card.Title>{article.title}</Card.Title>
                <Card.Text>{article.description}</Card.Text>
                <Card.Link href={article.url}>Read More</Card.Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <CustomPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </Container>
  );
};

export default Newslist;
