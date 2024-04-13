let totalAmount = 0;
    let orderId = 1;

    function addToCart(itemId) {
        const item = document.getElementById(itemId);
        const itemName = item.querySelector("h2").innerText;
        const selectedSize = parseFloat(item.querySelector(`#size${itemId.slice(-1)}`).value);
        const quantity = parseInt(item.querySelector(`#quantity${itemId.slice(-1)}`).value);

        let toppingsCost = 0;
        item.querySelectorAll(`#${itemId} input[type='checkbox']:checked`).forEach(topping => {
            toppingsCost += parseFloat(topping.value);
        });

        const toppingsList = Array.from(item.querySelectorAll(`#${itemId} input[type='checkbox']:checked`))
            .map(topping => topping.nextElementSibling.textContent.replace(' (+$', ''))
            .join(', ');

        const totalPrice = (selectedSize + toppingsCost) * quantity;
        totalAmount += totalPrice;

        const billBody = document.getElementById("billBody");
        const newRow = billBody.insertRow();
        newRow.innerHTML = `
            <td>${itemName}</td>
            <td>$${selectedSize.toFixed(2)}</td>
            <td>${toppingsList}</td>
            <td>${quantity}</td>
            <td>$${totalPrice.toFixed(2)}</td>
            <td><button onclick="removeItem(this, ${totalPrice.toFixed(2)})">Remove</button></td>
        `;

        document.querySelector("#totalAmount span").textContent = totalAmount.toFixed(2);
    }

    function removeItem(button, price) {
        const row = button.parentNode.parentNode;
        const currentTotal = parseFloat(document.querySelector("#totalAmount span").textContent);

        // Update total amount by subtracting the price of the item being removed
        const newTotal = currentTotal - price;
        document.querySelector("#totalAmount span").textContent = newTotal.toFixed(2);

        // Remove the row from the table
        row.parentNode.removeChild(row);
    }

    function processCheckout() {
        const name = document.getElementById("name").value.trim();
        const contact = document.getElementById("contact").value.trim();
        const address = document.getElementById("address").value.trim();

        // Check if any of the required fields are empty
        if (!name || !contact || !address) {
            alert("Please fill out all the required fields (Name, Phone Number, Address).");
            return; // Stop further execution
        }

        // Check if the cart is empty
        const cartItems = document.querySelectorAll("#billBody tr");
        if (cartItems.length === 0) {
            alert("Your cart is empty. Please add items before proceeding to checkout.");
            return; // Stop further execution
        }

        // Collect ordered items
        const itemsList = [];
        cartItems.forEach(item => {
            const itemName = item.cells[0].textContent;
            const itemSize = item.cells[1].textContent;
            const itemToppings = item.cells[2].textContent;
            const itemQuantity = item.cells[3].textContent;
            itemsList.push(`${itemName} (${itemSize}) - ${itemToppings} x${itemQuantity}`);
        });

        // Create a new row in the delivery status table
        const deliveryStatusBody = document.getElementById("deliveryStatusBody");
        const newRow = deliveryStatusBody.insertRow();
        newRow.innerHTML = `
            <td>${orderId}</td>
            <td>${name}</td>
            <td>${contact}</td>
            <td>${address}</td>
            <td>${itemsList.join('<br>')}</td>
            <td>$${totalAmount.toFixed(2)}</td>
            <td>Pending</td>
        `;

        // Increment order ID for the next order
        orderId++;

        // Display a confirmation message
        const message = `Thank you for your order, ${name}! Your total amount is $${totalAmount.toFixed(2)}.`;
        alert(message);

        // Automatically change delivery status to "Order Completed" after 10 seconds
        setTimeout(() => {
            newRow.cells[6].textContent = "Order Completed";
        }, 10000);

        // Reset cart and total amount
        document.querySelector("#totalAmount span").textContent = "0.00";
        document.getElementById("billBody").innerHTML = "";

        // Close the modal after processing checkout
        closeCheckoutModal();
    }

    function openCheckoutModal() {
        const modal = document.getElementById("checkoutModal");
        modal.style.display = "block";
    }

    function closeCheckoutModal() {
        const modal = document.getElementById("checkoutModal");
        modal.style.display = "none";
    }
