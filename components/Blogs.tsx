// 'use client';

// import { FaCalendar, FaClock, FaArrowRight } from 'react-icons/fa';

// const blogs = [
//   {
//     title: 'Getting Started with Machine Learning',
//     excerpt: 'A beginner-friendly guide to understanding the fundamentals of machine learning, covering key concepts, algorithms, and practical applications.',
//     date: 'Jan 15, 2024',
//     readTime: '5 min read',
//     category: 'Machine Learning',
//     link: '#'
//   },
//   {
//     title: 'Building Scalable Web Applications with Next.js',
//     excerpt: 'Learn how to leverage Next.js features like server-side rendering, static site generation, and API routes to build performant web applications.',
//     date: 'Dec 28, 2023',
//     readTime: '8 min read',
//     category: 'Web Development',
//     link: '#'
//   },
//   {
//     title: 'Understanding Neural Networks',
//     excerpt: 'Deep dive into the architecture of neural networks, backpropagation, and how to implement them using TensorFlow and PyTorch.',
//     date: 'Dec 10, 2023',
//     readTime: '10 min read',
//     category: 'Deep Learning',
//     link: '#'
//   },
  
//   {
//     title: 'Computer Vision with YOLOv8',
//     excerpt: 'Practical guide to object detection using YOLOv8, from training custom models to deploying them in production environments.',
//     date: 'Nov 05, 2023',
//     readTime: '12 min read',
//     category: 'Computer Vision',
//     link: '#'
//   },
//   // {
//   //   title: 'TypeScript Best Practices for React',
//   //   excerpt: 'Tips and patterns for writing type-safe React applications with TypeScript, improving code quality and developer experience.',
//   //   date: 'Oct 18, 2023',
//   //   readTime: '7 min read',
//   //   category: 'Web Development',
//   //   link: '#'
//   // },
// ];

// export default function Blogs() {
//   return (
//     <section id="blogs" className="min-h-screen py-20 px-4 sm:px-4 lg:px-8 bg-secondary/20">
//       <div className="max-w-7xl mx-auto">
//         <h2 className="text-4xl sm:text-5xl font-bold text-center mb-4">
//           <span className="text-gradient">Blog Posts</span>
//         </h2>
//         <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">
//           Sharing my learning journey, insights, and experiences in tech
//         </p>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {blogs.map((blog, index) => (
//             <article
//               key={index}
//               className="bg-secondary rounded-xl overflow-hidden border border-gray-800 hover:border-accent transition-all duration-300 hover:shadow-lg hover:shadow-accent/20 group cursor-pointer"
//             >
//               {/* Category Badge */}
//               <div className="p-6 pb-4">
//                 <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs font-semibold rounded-full border border-accent/20">
//                   {blog.category}
//                 </span>
//               </div>

//               {/* Content */}
//               <div className="px-6 pb-6">
//                 <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-accent transition-colors line-clamp-2">
//                   {blog.title}
//                 </h3>
//                 <p className="text-gray-400 leading-relaxed mb-4 line-clamp-3">
//                   {blog.excerpt}
//                 </p>

//                 {/* Meta Info */}
//                 <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
//                   <div className="flex items-center gap-1">
//                     <FaCalendar className="text-xs" />
//                     <span>{blog.date}</span>
//                   </div>
//                   <div className="flex items-center gap-1">
//                     <FaClock className="text-xs" />
//                     <span>{blog.readTime}</span>
//                   </div>
//                 </div>

//                 {/* Read More Link */}
//                 <a
//                   href={blog.link}
//                   className="inline-flex items-center gap-2 text-accent hover:text-accent-dark transition-colors font-semibold group-hover:gap-3 duration-300"
//                 >
//                   Read More <FaArrowRight className="text-sm" />
//                 </a>
//               </div>
//             </article>
//           ))}
//         </div>

//         {/* View All Blogs Button */}
//         <div className="text-center mt-12">
//           <button className="px-8 py-3 bg-accent hover:bg-accent-dark rounded-lg transition-all duration-300 font-semibold shadow-lg hover:shadow-accent/50">
//             View All Posts
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// }
'use client';

import { useState } from 'react';
import { FaCalendar, FaClock, FaArrowRight } from 'react-icons/fa';

const blogs = [
  {
    title: '➡️ Machine Learning Explained: A Practical Beginner’s Guide to Concepts, Algorithms, and Use Cases',
    excerpt:
      'A beginner-friendly guide to understanding the fundamentals of machine learning, covering key concepts, algorithms, and practical applications.',
 
  content: `
Date: January 15, 2024 | Read Time: 8 min

Machine learning has become one of the most transformative technologies of our time, powering everything from recommendation systems on Netflix to self-driving cars. If you're just starting your journey into ML, the landscape can seem overwhelming. This guide will help you understand the fundamentals and get you started on the right path.

What is Machine Learning?

At its core, machine learning is about teaching computers to learn from data rather than explicitly programming them with rules. Instead of writing code that says "if this, then that," we feed algorithms examples and let them discover patterns on their own. Think of it like teaching a child to recognize animals—you show them pictures of cats and dogs until they learn to distinguish between them.

There are three main types of machine learning:

Supervised Learning is where you have labeled data—inputs paired with correct outputs. For example, emails labeled as "spam" or "not spam." The algorithm learns from these examples to predict labels for new, unseen data. Common algorithms include linear regression, decision trees, and neural networks.

Unsupervised Learning deals with unlabeled data. Here, the algorithm tries to find hidden patterns or groupings without being told what to look for. Customer segmentation in marketing is a classic example.

Reinforcement Learning is like training a dog with treats. The algorithm learns by trial and error, receiving rewards for good actions and penalties for bad ones.

The Essential Toolkit

Python is the de facto language for machine learning due to its simplicity and ecosystem.

• NumPy – efficient numerical computing  
• Pandas – data cleaning and manipulation  
• Scikit-learn – beginner-friendly ML algorithms  
• Matplotlib & Seaborn – data visualization  

Understanding the Workflow

Every ML project follows a structured workflow:
1. Problem definition  
2. Data collection & exploration  
3. Data preprocessing  
4. Feature engineering  
5. Model training  
6. Evaluation  
7. Iteration  

Common Pitfalls to Avoid

• Overfitting  
• Ignoring baselines  
• Using complex models without enough data  

Taking the Next Steps

Start small, build projects, participate in Kaggle competitions, and share your learning publicly. Machine learning is a journey—focus on understanding, experimentation, and continuous improvement.
`,
  date: 'Jan 15, 2024',
  readTime: '8 min read',
  category: 'Machine Learning',
},

  
  {
  title: '➡️ Neural Networks Demystified: How They Learn, Train, and Power Modern AI Systems',
  excerpt:
    'A deep dive into neural network architecture, training dynamics, and real-world implementation.',
  content: `
Neural networks are often described as “mimicking the human brain,” but this oversimplification hides what truly makes them powerful. After implementing neural networks from scratch and deploying them in production, I’ve learned that understanding how they actually work—not just the analogy—is what enables effective real-world use.

## The Building Blocks

A neural network is fundamentally a function approximator. Given inputs and desired outputs, it learns a mathematical mapping between them. The “neural” aspect comes from structuring this function as layers of simple computational units called neurons.

Each neuron computes a weighted sum of inputs, adds a bias, and applies an activation function. Activation functions introduce non-linearity, allowing networks to model complex patterns. ReLU is widely used due to its efficiency and stable gradient flow.

## Why Layers Matter

Stacking layers enables hierarchical learning. Early layers capture low-level patterns, while deeper layers learn abstract representations. In computer vision, this progression moves from edges to shapes to full objects. Deeper networks perform better on complex tasks but require careful training to avoid overfitting.

## The Learning Process

Training is an optimization problem. The model starts with random weights, makes predictions, computes error using a loss function, and updates weights through backpropagation. Optimizers like Adam improve convergence by adapting learning rates dynamically.

Gradient descent variants—batch, stochastic, and mini-batch—control how updates are applied, with mini-batch gradient descent being the industry standard.

## Activation Functions

Activation choice strongly impacts training:
- Sigmoid: useful for probabilities but suffers from vanishing gradients
- ReLU: fast and effective, but can cause dead neurons
- Leaky ReLU and Parametric ReLU: mitigate ReLU limitations
- Advanced functions like Swish and ELU improve deep network performance

## Overfitting and Regularization

Overfitting occurs when a model memorizes training data. Techniques like L2 regularization, dropout, early stopping, and data augmentation improve generalization and robustness.

## Architecture Patterns

- Feedforward Networks: ideal for tabular data
- CNNs: dominate computer vision by exploiting spatial structure
- RNNs (LSTM, GRU): handle sequential data effectively
- Transformers: use attention mechanisms to model long-range dependencies and power modern NLP systems

## Practical Implementation

Frameworks like PyTorch and TensorFlow simplify development. Normalizing inputs, starting with simple architectures, and monitoring training curves are critical best practices for stable training.

## Debugging Neural Networks

Common debugging steps include validating data pipelines, testing overfitting on small datasets, monitoring gradients, and adjusting initialization or activation functions.

## The Path Forward

Understanding neural networks transforms them from black boxes into controllable tools. By mastering fundamentals—neurons, layers, optimization, and regularization—you can design better models, debug effectively, and build scalable AI systems that perform reliably in production.
`,
  date: 'Dec 10, 2023',
  readTime: '10 min read',
  category: 'Deep Learning',
},

 {
  title: '➡️ Real-Time Object Detection with YOLOv8: From Model Training to Production Deployment',
  excerpt:
    'A practical, industry-focused guide to building real-time object detection systems using YOLOv8.',
  content: `
Object detection has evolved from an academic curiosity to a practical tool powering applications from autonomous vehicles to retail analytics. YOLOv8 represents the latest evolution in real-time object detection, offering accuracy that rivals slower methods while maintaining the speed YOLO is famous for. After deploying YOLOv8 in production systems, I’ve learned what it takes to go from a demo to a reliable solution.

## Understanding YOLO’s Philosophy

YOLO—You Only Look Once—revolutionized object detection by framing it as a single regression problem. Instead of multi-stage pipelines that propose regions, extract features, and classify them separately, YOLO predicts bounding boxes and class probabilities in one forward pass. This single-stage design enables real-time performance, with YOLOv8 exceeding 100 FPS on modern GPUs.

Early YOLO versions traded accuracy for speed, struggling with small objects and localization. YOLOv8 integrates improved architectures, anchor-free detection, advanced augmentation, and refined training strategies to achieve both speed and accuracy.

## The YOLOv8 Architecture

YOLOv8 uses a CSPDarknet backbone for feature extraction, improving gradient flow and reducing computational cost. Multi-scale features allow detection of objects at different sizes.

The PANet-based neck aggregates features bidirectionally, ensuring both semantic depth and spatial precision. YOLOv8’s anchor-free detection head simplifies training and improves generalization by predicting bounding boxes directly rather than adjusting predefined anchors.

## Training Your First Model

The Ultralytics library makes YOLOv8 accessible: \`pip install ultralytics\` is enough to get started. While inference is trivial, training effective models requires careful data preparation.

YOLO expects normalized bounding box annotations (center x, center y, width, height). Dataset diversity is critical—vary lighting, angles, scales, and occlusions. Aim for at least 500 images per class when possible.

Standard dataset splits are 70% training, 20% validation, and 10% testing, ensuring each split represents real-world conditions.

Hyperparameters matter. Image size balances accuracy and speed, batch size depends on GPU memory, and learning rate strongly affects convergence. YOLOv8’s cosine annealing scheduler stabilizes training over epochs.

## Data Augmentation Strategies

YOLOv8 includes geometric and photometric augmentations such as flips, scaling, brightness adjustment, Mosaic, and MixUp. These improve robustness but must align with real-world use cases—over-augmentation can hurt performance if it creates unrealistic samples.

## Evaluation Metrics

Mean Average Precision (mAP) is the primary metric. mAP@0.5 is lenient, while mAP@0.5:0.95 reflects stricter localization accuracy. Precision and recall highlight false positives and false negatives.

Always inspect per-class metrics. High overall mAP can hide failures on rare or critical classes. Confusion matrices help diagnose systematic misclassifications.

## Inference Optimization

Production models require optimization. Exporting to ONNX enables TensorRT acceleration, often doubling inference speed. Quantization reduces model size by up to 4× with minimal accuracy loss, ideal for edge devices.

Batching improves throughput, while pruning can further optimize speed at the cost of additional training complexity.

## Production Deployment

A real-world pipeline includes preprocessing, inference, postprocessing, and decision logic. Non-maximum suppression removes duplicate detections, and confidence thresholds balance precision and recall.

For video, tracking adds temporal consistency. Error handling, monitoring, and graceful degradation are essential for reliable systems.

## Real-World Challenges

Lighting variation, occlusion, scale diversity, and class imbalance are common pitfalls. Address them through dataset diversity, weighted sampling, focal loss, and robust augmentation.

## Measuring Success

Business impact matters more than benchmark scores. A/B testing and continuous monitoring ensure models remain effective as data distributions shift.

## The Learning Curve

Start with pre-trained models, iterate quickly with small datasets, and study YOLOv8 documentation and community discussions. Mastering fundamentals—data quality, evaluation, optimization, and deployment—turns YOLOv8 into a powerful production tool.
`,
  date: 'Nov 05, 2023',
  readTime: '12 min read',
  category: 'Computer Vision',
}

];

export default function Blogs() {
  const [activeBlog, setActiveBlog] = useState<number | null>(null);

  return (
    <section
      id="blogs"
      className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 bg-secondary/20"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-bold text-center mb-4">
          <span className="text-gradient">Blog Posts</span>
        </h2>
        <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">
          Sharing my learning journey, insights, and experiences in tech
        </p>

        {/* BLOG GRID → 2 x 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogs.map((blog, index) => (
            <article
              key={index}
              className="bg-secondary rounded-xl border border-gray-800 hover:border-accent transition-all duration-300 hover:shadow-lg hover:shadow-accent/20"
            >
              <div className="p-6">
                <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs font-semibold rounded-full border border-accent/20 mb-4">
                  {blog.category}
                </span>

                <h3 className="text-xl font-semibold text-white mb-3">
                  {blog.title}
                </h3>

                <p className="text-gray-400 mb-4">{blog.excerpt}</p>

                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <FaCalendar />
                    {blog.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <FaClock />
                    {blog.readTime}
                  </div>
                </div>

                <button
                  onClick={() => setActiveBlog(index)}
                  className="inline-flex items-center gap-2 text-accent hover:text-accent-dark font-semibold"
                >
                  Read More <FaArrowRight />
                </button>
              </div>
            </article>
          ))}
        </div>

      
         {/* MODAL */}
{activeBlog !== null && (
  <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
    <div className="bg-secondary max-w-3xl w-full rounded-xl relative flex flex-col max-h-[66vh]">

      {/* Header */}
      <div className="p-6 border-b border-gray-800">
        <h3 className="text-2xl font-bold text-white">
          {blogs[activeBlog].title}
        </h3>
      </div>

      {/* Scrollable Content */}
      <div className="p-6 overflow-y-auto text-gray-400 leading-relaxed flex-1 whitespace-pre-line">
        {blogs[activeBlog].content}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-800 flex justify-end">
        <button
          onClick={() => setActiveBlog(null)}
          className="px-6 py-2 bg-accent hover:bg-accent-dark rounded-lg font-semibold"
        >
          Show Less
        </button>
      </div>

    </div>
  </div>
)}

      </div>
    </section>
  );
}
