// Define Order class
class Order {
    constructor(orderId, items, totalAmount, status, customerDetails, phone) {
        this.orderId = orderId;
        this.items = items;
        this.totalAmount = totalAmount;
        this.status = status;
        this.phone = phone;
        this.customerDetails = customerDetails;
    }
}

// Sample orders
const orders = [
    new Order('123', [{ name: 'Margherita', quantity: 2 }, { name: 'Pepperoni', quantity: 1 }], 28.97, 'Delivered', { name: 'John Doe', address: '123 Main St', phone: '555-1234' }),
    new Order('124', [{ name: 'Garden fresh', quantity: 1 }], 12.99, 'Delivered', { name: ' Smith J', address: '456 Elm St', phone: '555-5678' }),
    new Order('125', [{ name: 'Chicken', quantity: 1 }], 12.99, 'Delivered', { name: 'Pranath G', address: '150 marina park', phone: '555-5679' })
];

// Function to track order
function trackOrder(phone) {
    const order = orders.find(order => order.customerDetails.phone === phone);
    return order ? order : null;
}

// Function to display order details
function displayOrderDetails(order) {
    const orderDetailsDiv = document.getElementById('order-details');
    if (order) {
        orderDetailsDiv.innerHTML = `
            <p><strong>Order ID:</strong> ${order.orderId}</p>
            <p><strong>Status:</strong> ${order.status}</p>
            <p><strong>Items:</strong> ${order.items.map(item => `${item.quantity} ${item.name}`).join(', ')}</p>
            <p><strong>Total Amount:</strong> $${order.totalAmount.toFixed(2)}</p>
            <p><strong>Customer Name:</strong> ${order.customerDetails.name}</p>
            <p><strong>Address:</strong> ${order.customerDetails.address}</p>
            <p><strong>Phone:</strong> ${order.customerDetails.phone}</p>
            
        `;
    } else {
        orderDetailsDiv.innerHTML = '<p>Order not found.</p>';
    }
}

// Track order button click event
document.getElementById('track-order-btn').addEventListener('click', function() {
    const orderId = document.getElementById('order-id').value;
    const order = trackOrder(orderId);
    displayOrderDetails(order);
});
