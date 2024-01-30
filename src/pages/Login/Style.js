import styled from "styled-components";
export const CardWrapper = styled.div`
  overflow: hidden;
  padding: 0 0 32px;
  margin: 20px;
 
  width: 30%;
  margin-right: 100px;
  width: 300px;
  font-family:  arial, sans-serif;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05), 0 0px 40px rgba(0, 0, 0, 0.08);
  border-radius: 5px;
`;
export const CardHeader = styled.header`
  padding-top: 30px;
  /* padding-bottom: 30px; */
`;
export const CardHeading = styled.h1`
  font-size: 24px;
  padding-bottom: 15px;
  font-weight: bold;
  text-align: center;
`;
export const CardBody = styled.div`
  padding-right: 32px;
  padding-left: 32px;
`;
export const CardFieldset = styled.fieldset`
  position: relative;
  padding: 0;
  margin: 0;
  border: 0;
  & + & {
    margin-top: 24px;
  }
  &:last-of-type {
    text-align: center;
  }
`;
export const CardInput = styled.input`
  padding: 7px 0;
  width: 100%;
  font-family: inherit;
  font-size: 12px;
  border-top: 0;
  border-right: 0;
  border-bottom: 1px solid #ddd;
  border-left: 0;
  transition: border-bottom-color 0.25s ease-in;
  &:focus {
    border-bottom-color: #e5195f;
    outline: 0;
  }
`;
export const CardOptionsNote = styled.small`
  padding-top: 8px;
  display: block;
  width: 100%;
  font-size: 12px;
  text-align: center;
  text-transform: uppercase;
`;
export const CardOptions = styled.ul`
  padding: 0;
  margin: 16px 0 8px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  width: 100%;
  list-style-type: none;
`;
export const CardOptionsItem = styled.li`
  &:nth-of-type(n + 2) {
    margin-left: 22px;
  }
`;
export const CardButton = styled.button`
  display: block;
  width: 100%;
  padding: 10px 0;
  font-family: inherit;
  font-size: 14px;
  font-weight: 700;
  color: #fff;
  background-color: #007bff;
  border: 0;
  border-radius: 35px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.02, 0.01, 0.47, 1);
  &:hover {
    box-shadow: 0 15px 15px rgba(0, 0, 0, 0.16);
    transform: translate(0, -5px);
  }
`;
export const CardLink = styled.div`
  display: inline-block;
  font-size: 12px;
  text-decoration: none;
  color: #aaa;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
  transition: color 0.25s ease-in;
  &:hover {
    color: #777;
  }
`;