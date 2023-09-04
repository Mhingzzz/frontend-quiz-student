"use client"
// import { API_URL } from "@/utils/api";
import { Input, Button, Card, Title, Stack } from "@mantine/core";
import axios from "axios";
import {useState} from "react"
import * as z from "zod"
export default function Form() {
  // const [firstName , setFirstName] = useState("")
  // const [lastName , setLastName] = useState("")
  // const [email , setEmail] = useState("")
  // const [amount, setAmount] = useState("")

  // const onHandler = (e: any) => {

  // }

  // return (

  //   <Card withBorder shadow="xs" p="xl" bg="cyan.2">
  //     <Title order={1} color="blue">
  //       Donate
  //     </Title>

  //     <form>
  //       <Stack spacing={"xs"}>
  //         <Input.Wrapper>
  //           <Input.Label>First Name</Input.Label>
  //           <Input name = "firstName" onChange={(e) => setFirstName(e.currentTarget.value)}/>
  //           <Input.Error>{/* Error goes here */}</Input.Error>
  //         </Input.Wrapper>

  //         <Input.Wrapper>
  //           <Input.Label>Last Name</Input.Label>
  //           <Input name = "lastName" onChange={(e) => setLastName(e.currentTarget.value)} />
  //           <Input.Error>{/* Error goes here */}</Input.Error>
  //         </Input.Wrapper>

  //         <Input.Wrapper>
  //           <Input.Label>Email</Input.Label>
  //           <Input name = "email" onChange={(e) => setEmail(e.currentTarget.value)}/>
  //           <Input.Error>{/* Error goes here */}</Input.Error>
  //         </Input.Wrapper>

  //         <Input.Wrapper>
  //           <Input.Label>Donation Amount</Input.Label>
  //           <Input name = "amount" onChange={(e) => setAmount(e.currentTarget.value)}/>
  //           <Input.Error>{/* Error goes here */}</Input.Error>
  //         </Input.Wrapper>
  //         <Button >Submit</Button>
  //       </Stack>
  //     </form>
  //   </Card>
  // );

   const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    amount: '',
  });

  const handleChange = (e:any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    // ตรวจสอบข้อมูลก่อนส่ง
    if (
      formData.firstName.trim() === '' ||
      formData.lastName.trim() === '' ||
      !isValidEmail(formData.email) ||
      !isValidAmount(formData.amount)
    ) {
      // แสดงข้อความข้อผิดพลาดถ้าข้อมูลไม่ถูกต้อง
      return;
    }

    try {
      // ส่งข้อมูลผ่าน POST Request
      const response = await axios.post(
        'https://donation-server-production.up.railway.app/donate',
        formData
      );

      // ตรวจสอบว่าส่งสำเร็จหรือไม่
      if (response.status === 200) {
        // ดำเนินการตามที่คุณต้องการหลังจากสำเร็จ
        console.log('Donation successful');
setFormData({
        firstName: '',
        lastName: '',
        email: '',
        amount: '',
      });
        
      } else {
        // แสดงข้อความข้อผิดพลาดถ้าส่งไม่สำเร็จ
        console.error('Failed to make a donation');
        setFormData({
        firstName: '',
        lastName: '',
        email: '',
        amount: '',
      });
      }

      setFormData({
      ...formData,
      [e.target.name]: '',
    })
    } catch (error) {
      console.error('Error:', error);
    }
    
  };

  // ตรวจสอบว่าอีเมลมีรูปแบบที่ถูกต้องหรือไม่
  const isValidEmail = (email:any) => {
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailPattern.test(email);
  };

  // ตรวจสอบว่าจำนวนเงินเป็นตัวเลขและมากกว่า 1000
  const isValidAmount = (amount:any) => {
    return /^\d+$/.test(amount) && parseInt(amount, 10) > 1000;
  };

  return (
    <Card withBorder shadow="xs" p="xl" bg="cyan.2">
      <Title order={1} color="blue">
        Donate
      </Title>
      <form>
        <Stack spacing={'xs'}>
          <Input.Wrapper>
            <Input.Label>First Name</Input.Label>
            <Input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
            <Input.Error>{/* Error goes here */}</Input.Error>
          </Input.Wrapper>

          <Input.Wrapper>
            <Input.Label>Last Name</Input.Label>
            <Input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
            <Input.Error>{/* Error goes here */}</Input.Error>
          </Input.Wrapper>

          <Input.Wrapper>
            <Input.Label>Email</Input.Label>
            <Input
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <Input.Error>{/* Error goes here */}</Input.Error>
          </Input.Wrapper>

          <Input.Wrapper>
            <Input.Label>Donation Amount</Input.Label>
            <Input
              name="amount"
              value={formData.amount}
              onChange={handleChange}
            />
            <Input.Error>{/* Error goes here */}</Input.Error>
          </Input.Wrapper>
          <Button type="submit" onClick={handleSubmit}>Submit</Button>
        </Stack>
      </form>
    </Card>
  );
}