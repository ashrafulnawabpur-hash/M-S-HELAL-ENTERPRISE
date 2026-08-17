# Email Templates for M/S Helal Enterprise

Two production-ready HTML email templates designed to match the SKF style of the main website (navy `#00243f`, electric blue `#0072c6`, Archivo/Helvetica).

## Files

| File | Purpose | Triggers |
|------|---------|----------|
| `order-confirmation.html` | Sent to customer after cart checkout | Order placed |
| `contact-confirmation.html` | Sent to customer immediately after contact form | Contact enquiry |

## How to use

### Replace placeholders

Both templates use `{{TOKEN}}` syntax compatible with most email engines:

- `{{ORDER_ID}}` — e.g., `HE-342045`
- `{{ORDER_DATE}}` — readable date
- `{{CUSTOMER_NAME}}` — e.g., `Md. Abdul Karim`
- `{{TRACKING_URL}}` — link to order status on your site
- `{{INQUIRY_ID}}` — e.g., `INQ-882045`
- `{{SUBJECT}}`, `{{MESSAGE}}`, `{{DATE}}` — from the contact form
- `{{YEAR}}` — current year

### Duplicate item rows

In `order-confirmation.html`, copy the entire **ITEM TEMPLATE** table block (marked with comments) for each product in the order, then replace:
- `{{PRODUCT_IMAGE}}` — direct HTTPS URL to product photo (from your site)
- `{{PRODUCT_NAME}}` — full product name
- `{{PRODUCT_BRAND}}` · `{{PRODUCT_SKU}}` · `{{IN_STOCK}}`
- `{{QTY}}` × `{{UNIT_PRICE}}` = item total

### Testing

- **Outlook.com / Gmail web:** Upload to service like [Putsmail](https://putsmail.com/) or [Email on Acid](https://www.emailonacid.com/) for instant previews
- **Outlook desktop:** These templates are MSO/VML-commented for maximum compatibility
- **Mobile:** Verified responsive using fluid tables (max-width: 600px)

## Design Notes

- Single-column layout (`600px max-width` = safe for Outlook 2016+)
- Inline CSS only (no `<style>` block) for maximum client compatibility
- SVG logo inlined (layered PNG would be needed for Outlook desktop compatibility in production)
- VML comments included for future Outlook compatibility
