import React from 'react';
import { UserName } from './UserList';
import './msstyles.css';

export const Preview = ({
  savedUsers,
  savedItems,
  updateItemQuantity,
  removeItem,
}) => {
  const calculateSubtotal = (item) => {
    return Number(item.price) * Number(item.quantity);
  };

  const calculateTotal = () => {
    let total = 0;
    savedUsers.forEach((user) => {
      Object.keys(savedItems[user] || {}).forEach((category) => {
        savedItems[user][category].forEach((item) => {
          total += calculateSubtotal(item);
        });
      });
    });
    return total;
  };

  const hasItemsToShow = savedUsers.some((user) =>
    Object.keys(savedItems[user] || {}).some(
      (category) => savedItems[user][category].length > 0
    )
  );

  if (!hasItemsToShow) {
    return null;
  }

  return (
    <div className="preview-box">
      <h3>Preview</h3>
      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Item</th>
            <th>Quantity</th>
            <th>Subtotal</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {savedUsers.map((user) => {
            const userItems = savedItems[user];
            const categories = Object.keys(userItems);

            let firstRowRendered = false;

            return categories.map((category, categoryIndex) =>
              userItems[category].map((item, itemIndex) => {
                const isFirstRow = !firstRowRendered;
                if (isFirstRow) {
                  firstRowRendered = true;
                }

                const totalItemsForUser = categories.reduce(
                  (acc, cat) => acc + userItems[cat].length,
                  0
                );

                return (
                  <tr key={`${user}-${category}-${item.name}`}>
                    {isFirstRow && (
                      <td rowSpan={totalItemsForUser}>
                        <UserName userId={user} />
                      </td>
                    )}
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>₹{calculateSubtotal(item)}</td>
                    <td>
                      <button
                        className="buttonI"
                        onClick={() =>
                          updateItemQuantity(user, category, item.name, 1)
                        }
                      />
                      <button
                        className="buttonD"
                        onClick={() =>
                          updateItemQuantity(user, category, item.name, -1)
                        }
                      />

                      <button
                        className="buttonR"
                        onClick={() => removeItem(user, category, item.name)}
                      />
                    </td>
                  </tr>
                );
              })
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="4">Grand Total</td>
            <td>₹{calculateTotal()}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};
