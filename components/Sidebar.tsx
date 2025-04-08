"use client";
import Link from 'next/link';
import styled from '@emotion/styled';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const SidebarContainer = styled.aside<{ open: boolean }>`
  position: fixed;
  left: ${({ open }) => (open ? '0' : '-250px')};
  top: 0;
  width: 250px;
  height: 100vh;
  background-color: #222;
  color: white;
  transition: left 0.3s ease;
  z-index: 1000;
  padding: 10px 30px;
  display: flex;
  flex-direction: column;
`;

const ToggleButton = styled.button<{ open: boolean }>`
  position: fixed;
  top: 15px;
  left: ${({ open }) => (open ? '200px' : '15px')}; 
  z-index: 1100;
  background-color: transparent;
  color: white;
  padding: 8px; 
  border: none;
  cursor: pointer;
  transition: left 0.3s ease;

  @media (min-width: 768px) {
    top: 20px; 
    left: ${({ open }) => (open ? '190px' : '20px')}; 
    padding: 10px; 
  }
`;

const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 15px; 
  border-bottom: 1px solid #333;
  margin-bottom: 15px; 
`;

const SidebarContent = styled.nav`
  flex-grow: 1;
  padding-top: 15px; 
`;

const SidebarList = styled.li`
  padding: 10px 15px; 
  margin-bottom: 6px; 
  border-radius: 6px;
  transition: background-color 0.3s ease;
  font-size: 1rem; 
  font-weight: 500;

  &:hover {
    background-color: #333;
    cursor: pointer;
  }

  a {
    display: block;
    color: inherit;
    text-decoration: none;
  }
`;

const LogoImage = styled.img`
  width: 60px;
  height: 60px; 

  @media (min-width: 768px) {
    width: 70px; 
    height: 70px;
  }
`;

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  const toggleSidebar = () => {
    setOpen(!open);
  };

  return (
    <>
      <ToggleButton onClick={toggleSidebar} open={open}>
        {open ? <X size={24} /> : <Menu size={24} />} 
      </ToggleButton>
      <SidebarContainer open={open}>
        {open && (
          <SidebarHeader>
            <LogoImage
              src="/logoipsum-280.svg"
              alt="Logo"
            />
          </SidebarHeader>
        )}
        <SidebarContent>
          <ul>
            <SidebarList><Link href="/" onClick={toggleSidebar}>Home</Link></SidebarList>
            <SidebarList><Link href="/history" onClick={toggleSidebar}>History</Link></SidebarList>
          </ul>
        </SidebarContent>
      </SidebarContainer>
    </>
  );
}