import { useState } from 'react';
import { Input } from './ui/Input'; // Ensure this import points to the correct path for Input component
import { Button } from './ui/Button'; // Ensure this import points to the correct path for Button component
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify'; // Import toast functions
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles

export default function UserForm() {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      toast.success('User created successfully!'); // Show success toast
      setTimeout(() => {
        router.reload(); // Refresh the page after 2 seconds
      }, 2000);
    } else {
      // Show error toast
      toast.error('Error creating user. Please try again.');
      console.error('Error submitting form:', await res.text());
    }
  };

  return (
    <>
      <form 
        onSubmit={handleSubmit} 
        className="space-y-6 p-8 bg-zinc-100 rounded-md shadow-md max-w-lg mx-auto" // Increased padding and width
      >
        <h2 className="text-2xl font-bold text-gray-800">Create User</h2>
        <Input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full"
          required
        />
        <Input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full"
          required
        />
        <Button type="submit" className="w-full">Submit</Button>
      </form>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick draggable pauseOnHover /> {/* Toast container */}
    </>
  );
}
