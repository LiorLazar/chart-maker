# Chart Maker

A dynamic web application for creating, editing, and sharing interactive charts and graphs. Built with vanilla JavaScript and HTML5 Canvas, this tool provides an intuitive interface for data visualization.

## 🚀 Features

### Chart Management
- **Create Charts**: Generate bar charts with custom data
- **Edit Charts**: Add, update, and remove chart terms dynamically
- **Gallery View**: Browse and select from saved charts
- **Persistent Storage**: Charts are saved locally using localStorage

### Chart Customization
- **Custom Terms**: Add labeled data points with custom values and colors
- **Value Types**: Toggle between numerical values and percentages
- **Styling Options**: Customize fonts, colors, and chart appearance
- **Responsive Canvas**: Charts automatically adjust to container size

### Export & Sharing
- **Download**: Export charts as JPG images
- **Cloud Upload**: Share charts via Cloudinary integration
- **Social Sharing**: Direct Facebook sharing functionality

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Graphics**: HTML5 Canvas API
- **Storage**: Browser localStorage
- **Cloud Services**: Cloudinary for image hosting
- **Architecture**: MVC pattern with service-oriented design

## 📁 Project Structure

```
chart-maker/
├── index.html                 # Main HTML file
├── js/
│   ├── controllers/
│   │   └── gallery.controller.js  # Main controller logic
│   └── services/
│       ├── chart.service.js       # Chart data management
│       ├── storage.service.js     # localStorage utilities
│       ├── upload.service.js      # Cloudinary integration
│       └── util.service.js        # Helper functions
└── styles/
    ├── styles.css             # Main stylesheet
    ├── basics/                # Base styles
    │   ├── base.css
    │   ├── helpers.css
    │   └── layout.css
    ├── components/            # Component styles
    │   ├── main-nav.css
    │   └── value-type.css
    └── setup/                 # Setup files
        ├── vars.css
        ├── typography.css
        └── mq.css
```

## 🎯 Getting Started

### Prerequisites
- Modern web browser with HTML5 Canvas support
- No additional dependencies required

### Installation
1. Clone or download the project
2. Open `index.html` in your web browser
3. Start creating charts!

### Usage

#### Creating Your First Chart
1. Click "My Charts" to view the gallery
2. Select an existing chart or create a new one
3. Use the editing panel to:
   - Add new terms with custom labels, values, and colors
   - Update existing terms
   - Remove unwanted terms

#### Customizing Charts
- **Value Types**: Click the number (123) or percentage (%) buttons to toggle value display
- **Colors**: Specify custom colors when adding or editing terms
- **Labels**: Add descriptive labels for each data point

#### Exporting & Sharing
- **Download**: Click the "Download" button to save as JPG
- **Share**: Use the "Share" button to upload to cloud and get a shareable link
- **Facebook**: Share directly to Facebook after uploading

## 🔧 Configuration

### Cloudinary Setup
To enable sharing functionality, update the Cloudinary configuration in `js/services/upload.service.js`:

```javascript
const CLOUD_NAME = 'your-cloud-name'
const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
```

Make sure to set up the appropriate upload preset in your Cloudinary dashboard.

## 🎨 Customization

### Styling
- Modify CSS variables in `styles/setup/vars.css` for global color scheme
- Update component styles in `styles/components/` for specific elements
- Adjust layout in `styles/basics/layout.css`

### Chart Types
Currently supports bar charts. To add new chart types:
1. Update the `drawChart` function in `chart.service.js`
2. Add new chart themes in the `_createCharts` function
3. Implement rendering logic for new chart types

## 📊 Default Charts

The application comes with two sample charts:
1. **Elections Results**: A percentage-based chart with custom styling
2. **Sales Data**: A quarterly sales chart with multiple data points

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🐛 Known Issues

- Chart themes are currently limited to bar charts
- Mobile responsiveness could be improved
- No data validation for user inputs

## 🚧 Future Enhancements

- [ ] Additional chart types (pie, line, scatter)
- [ ] Import data from CSV/JSON files
- [ ] Advanced styling options
- [ ] Chart templates
- [ ] Collaborative editing
- [ ] Mobile optimization
- [ ] Data validation and error handling

## 📞 Support

For questions, issues, or contributions, please open an issue in the project repository.

---

**Happy charting!** 📊✨
