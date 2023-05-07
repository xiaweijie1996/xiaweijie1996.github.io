---
title: A small review of transfer learning-domain adaptation
categories:
- Machine Learning
feature_image: "https://i.postimg.cc/90b8d1jW/wallhaven-9mjoy1.jpg"
---

<head>
    <script src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML" type="text/javascript"></script>
    <script type="text/x-mathjax-config">
        MathJax.Hub.Config({
            tex2jax: {
            skipTags: ['script', 'noscript', 'style', 'textarea', 'pre'],
            inlineMath: [['$','$']]
            }
        });
    </script>
</head>

<p>Recently, some transfer learning models are needed for scientific research. Here is a technical review note, which can be used by those in need. All suggestions and discussions are welcome.</p>
<p>Reference list:</p>
<ul>
<li data-pid="vjrPjHPC">Thrun, Sebastian. "Is learning the n-th thing any easier than learning the first?."<em>Advances in neural information processing systems</em>8 (1995).</li>
<li data-pid="zuoDhNbl">Daum&eacute; III, Hal. "Frustratingly easy domain adaptation."<em>arXiv preprint arXiv:0907.1815</em>(2009).</li>
<li data-pid="qMCvnA8h">Pan, Sinno Jialin, James T. Kwok, and Qiang Yang. "Transfer learning via dimensionality reduction."<em>AAAI</em>. Vol. 8. 2008.</li>
<li data-pid="wOGYiDHM">Pan, S. J., Tsang, I. W., Kwok, J. T., &amp; Yang, Q. (2011). Domain Adaptation via Transfer Component Analysis. IEEE Transactions on Neural Networks.</li>
<li data-pid="1rSNWgzv">Ghifary, Muhammad, W. Bastiaan Kleijn, and Mengjie Zhang. "Domain adaptive neural networks for object recognition."<em>PRICAI 2014: Trends in Artificial Intelligence: 13th Pacific Rim International Conference on Artificial Intelligence, Gold Coast, QLD, Australia, December 1-5, 2014. Proceedings 13</em>. Springer International Publishing, 2014.</li>
<li data-pid="e2LzKKaO">Ganin, Yaroslav, and Victor Lempitsky. "Unsupervised domain adaptation by backpropagation."<em>International conference on machine learning</em>. PMLR, 2015.</li>
<li data-pid="bGIWgt4u">Zhuang, Fuzhen, et al. "Supervised representation learning: Transfer learning with deep autoencoders."<em>Twenty-fourth international joint conference on artificial intelligence</em>. 2015.</li>
<li data-pid="xJkWHQAX">Long, Mingsheng, et al. "Learning transferable features with deep adaptation networks."<em>International conference on machine learning</em>. PMLR, 2015.</li>
<li data-pid="Cj-TpyT6">Tzeng, Eric, et al. "Adversarial discriminative domain adaptation."<em>Proceedings of the IEEE conference on computer vision and pattern recognition</em>. 2017.</li>
<li data-pid="86uq0eMi">Zhuang, Fuzhen, et al. "A comprehensive survey on transfer learning."<em>Proceedings of the IEEE</em>109.1 (2020): 43-76</li>
</ul>
<p>&nbsp;</p>
<hr style="filter: alpha(opacity=100,finishopacity=0,style=3);" size="3" width="80%" />
<div class="group w-full text-gray-800 dark:text-gray-100 border-b border-black/10 dark:border-gray-900/50 dark:bg-gray-800">
<div class="flex p-4 gap-4 text-base md:gap-6 md:max-w-2xl lg:max-w-xl xl:max-w-3xl md:py-6 lg:px-0 m-auto">
<div class="relative flex flex-col w-[calc(100%-50px)] gap-1 md:gap-3 lg:w-[calc(100%-115px)]">
<div class="flex flex-grow flex-col gap-3">&nbsp;</div>
</div>
</div>
</div>
<div class="group w-full text-gray-800 dark:text-gray-100 border-b border-black/10 dark:border-gray-900/50 bg-gray-50 dark:bg-[#444654]">
<div class="flex p-4 gap-4 text-base md:gap-6 md:max-w-2xl lg:max-w-xl xl:max-w-3xl md:py-6 lg:px-0 m-auto">
<div class="flex-shrink-0 flex flex-col relative items-end">
<div class="text-xs flex items-center justify-center gap-1 invisible absolute left-0 top-2 -ml-4 -translate-x-full group-hover:visible !invisible">&nbsp;</div>
<div class="text-xs flex items-center justify-center gap-1 invisible absolute left-0 top-2 -ml-4 -translate-x-full group-hover:visible !invisible">
<h3><strong>Thrun, Sebastian. "Is learning the n-th thing any easier than learning the first?."<em>Advances in neural information processing systems</em>8 (1995).</strong></h3>
</div>
</div>
<div class="relative flex flex-col w-[calc(100%-50px)] gap-1 md:gap-3 lg:w-[calc(100%-115px)]">
<div class="flex flex-grow flex-col gap-3">
<div class="min-h-[20px] flex flex-col items-start gap-4 whitespace-pre-wrap break-words">
<div class="markdown prose w-full break-words dark:prose-invert light">
<p><strong>Basic Concepts </strong></p>
<p>Article 1 proposes that compared to supervised learning, the human brain actually has other learning mechanisms, that is, "the process of the human brain learning a concept not only uses concept-related training datasets but also uses data that already have relevant concepts (humans often employ more than just the training data for generalization)". An example is given in the article for a concept learning task (which can be understood as a classification task perhaps more directly). Let function $f \in \left\{f_1, f_2,f_3,.. ,f_{n-1}\right\}$ be an indicator function $f:I \rightarrow \left\{0,1 \right\}$, where $f_k$ represents a classifier of a certain item $k$, and for any $x \in I_k$, $f(x)=1$, and for $x \notin I_k$, $f_k(x)=0$. $X_k$ $(k=1,2,..,n-1)$ contains all the data sets $\left\langle x,f_k(x)\right\rangle$ of the first $n-1$ concepts (items). Therefore, a transfer learning task can be understood as when learning a new classifier $f_n$, you will not only use the dataset directly related to concept (item) $n$, but also use $X_k$ as an auxiliary data set, so $X_k$ is called the support set. The essence of transfer learning is to use the "invariants" in different data distributions. When I learn how to extract the "invariants", these "invariants" can assist new learning behaviors. Memory-based learning methods.</p>
<p><strong>Method 1: k-nearest neighbour.</strong></p>
<p>For the data $\langle x_i,y_i \rangle$, we can find the k-nearest points in $X_k$ to $\langle x_i,y_i \rangle$, and then compute $y_i = \frac{1}{k} \sum_{j=1}^k y_j$ to obtain the value of $y_i$.</p>
<p><strong>Method 2:</strong> Shepard, averaging Y with the distances between $\langle x_i,y_i \rangle$ and all points in $X_k$ as weights to obtain $y_i$.</p>
<p>$S(x_i)=(\sum_{\langle x_i,y_i \rangle \in X} \frac{y_i}{||x-x_i||^2+\epsilon}) \cdot c$</p>
<p>$c= \sum_{\langle x_i,y_i \rangle \in X} \frac{y_i}{||x-x_i||^2+\epsilon}$</p>
<p>Here, $\epsilon$ is a small constant to prevent division by zero.</p>
<p><strong>Method 3:</strong> Learn a new set of latent variables to represent the original variables.</p>
<p>$E:=\sum_{k=1}^{n-1} \sum_{\langle x,y=1 \rangle \in X_k} (\sum_{\langle x',y'=1\rangle \in X_k}||g(x)-g(x')||-\sum_{\langle x',y'=0 \rangle \in X_k}||g(x)-g(x')|| )$</p>
<p>By minimizing $E$, we hope to find the best mapping $g$ for $x$. Assuming that the new learning task can also be mapped to the latent variables obtained through $g$, we can generate latent variables for the new task data through $g$ and obtain better results using Method 1 and Method 2.</p>
<p><strong>Method 4:</strong> Learn a distance function.</p>
<p>We want to learn a distance function $d$ that satisfies:</p>
<p>$d(x,x')=1$, if $y = y'=1$</p>
<p>$d(x,x')=0$, if $y \neq y'$</p>
<p>There are many ways to learn this distance function, and the article uses a neural network method. Once we obtain $d$, we can obtain the classification result using the following formula.</p>
<p>$prob(f_n(x)=1)=1-(1+\prod_{\langle x',y'=1\rangle \in X_k}\frac{d(x,x')}{1-d(x,x')})$</p>
</div>
<p><strong>Neural network-based methods:</strong></p>
<p>The memory-based learning method described above (Method 3) only considers $X_k$ and does not consider the data for problem $n$. However, a neural network can be trained to simultaneously reduce $X_k$ and the data for problem $n$.</p>
<p>&nbsp;</p>
<h3><strong>Daum&eacute; III, Hal. "Frustratingly easy domain adaptation."<em>arXiv preprint arXiv:0907.1815</em>(2009).</strong></h3>
<p>&nbsp;</p>
<p><strong>Basic Concepts</strong></p>
<p>Article 2 proposes a very simple method of data augmentation. For the source domain and the target domain, their features can be divided into three parts: "common features," "source-specific features," and "target-specific features." The source domain consists of "common features" and "source-specific features," while the target domain consists of "common features" and "target-specific features." The source domain mapping function $\Phi_s$ and the target domain mapping function $\Phi_t$ are defined as:</p>
<p>$\Phi_s(x)= \left\langle \mathbf{x},\mathbf{x},\mathbf{0}\right\rangle$</p>
<p>$\Phi_t(x)= \left\langle \mathbf{x},\mathbf{0},\mathbf{x} \right\rangle$</p>
<p><strong>Kernelization</strong></p>
<p>The above method can also be kernelized with a kernel function $K$ (which is positive semi-definite):</p>
<p>$\Phi_s(x)= \left\langle\Phi(\mathbf{x}),\Phi(\mathbf{x}),\mathbf{0}\right\rangle$</p>
<p>$\Phi_t(x)= \left\langle \Phi(\mathbf{x}),\mathbf{0},\Phi(\mathbf{x}) \right\rangle$</p>
<p>The article gives an example of using the linear kernel function $K=\left\langle \Phi (x), \Phi(x') \right\rangle$:</p>
<p>$$ K=\left\{ \begin{array}{**rcl**} 2K(x,x')\ ,\ same.domain&amp; \\ K(x,x')\ \ , diff.domain &amp;\\ \end{array} \right.$$</p>



<h3>&nbsp;</h3>
<h3>&nbsp;</h3>
<h3>Pan, Sinno Jialin, James T. Kwok, and Qiang Yang. "Transfer learning via dimensionality reduction."AAAI. Vol. 8. 2008.</h3>
<p><strong>basic concept</strong></p>
<p>Article 3 proposes a method to achieve transfer learning through dimensionality reduction. The purpose of the algorithm is to project the source domain data and target domain data into a new space, and hope that 1) the source domain and target domain data in the new space The division is as close as possible (looking for "transferred features") 2) The variance of the division of the data itself is as large as possible (preserving the original information, similar to PCA) 3) Satisfying other limiting conditions. After finding a suitable projection space, other machine learning models can be trained in this space to achieve the purpose of transfer learning.</p>
<p><strong>Maximum mean discrepancy (MMD)</strong></p>
<p>In order to achieve the goal "the source domain is as close as possible to the target division", we first need a projection function $\Phi(&middot;):\mathcal{X}\rightarrow \mathcal{H}$ . The new space after projection becomes the Regenerated Kernel Hilbert Space (RKHS).</p>
<p>Then we need a function to measure the distance of $\Phi(X_s), \Phi(X_t)$ after projection. The article chooses MMD as the distance measure. The empirical estimation formula of MMD in RKHS is:</p>
<p>$$dis(X_s,X_t)=||\frac{1}{n_s}\sum_{i=1}^{n_s} \Phi(x_{i}^s)-\frac{1}{n_t}\sum_{ j=1}^{n_t} \Phi(x_{j}^t)||_{\mathcal{H}}$$</p>
<p>Therefore, the problem turns into finding a minimum $dis(X_s,X_t)$ .</p>
<p>In fact $dis(X_s,X_t)=trace(KL)$</p>
<p>$$K=\left[ \begin{array}{ccc} K_{s,s} &amp;K_{s,t}\\ K_{t,s} &amp; K_{t,t}\\ \end{array} \right ] \in \mathbb{R}^{(m+n)&times;(m+N)}$$</p>
<p>$$L=\left\{ \begin{array}{**rcl**} \frac{1}{{n^2_s}}\ ,\ x_i,x_j \in X_s&amp; \\ \frac{1}{{n^2_t}}\ ,\ x_i,x_j \in X_t&amp; \\ \frac{1}{{n_tn_s}}\ ,\ otherwise&amp; \\ \end{array} \right.$$</p>
<p>From dis to trace If you don't understand the calculation, refer to Teacher Wang: Wang Jindong is not at home: MMD calculation nuclear skill formula derivation</p>
<p>Because L is a fixed constant, the problem of minimizing dis is transformed into a positive semi-definite programming problem: find a K that minimizes dis.</p>
<p>But up to this point, we have only minimized the distance from the source domain to the target domain, and we have not yet achieved the maximum variance of the projected data. How? Add a regular term $trace(K)$ to the original optimization problem to represent the variance of the data (because 0 is the centre point $(x-0)^2=x^2$, see the explanation later). So the optimization problem becomes:</p>
<p>$$\min_{k} \ \ trace(KL)-\lambda trace(K)$$</p>
<p>But this is still not enough, two other constraints are added in the article 1) The spatial distance after projection is stable $K_{ii}^2+K_{jj}^2-2K_{ij}=d_{ij}^2$ 2 ) The projected data is centered on the origin K\mathbf{1}=\mathbf{0} . In addition, in order to ensure that K exists, according to "If a kernel matrix K can be written as $K = K' + &epsilon;I $, where $&epsilon; &gt; 0 $, $K'$ is position semi-definate and $I$ is the identity matrix, then the kernel function corresponding to $K$ is universal &rdquo; Rewrite $K$ as $K=K'+&epsilon; I $.</p>
<p>The optimization problem eventually becomes:</p>
<p>$$\min_{k'} \ \ trace(K'L)-\lambda trace(K') \\ s.t. {K'}_{ii}^2+{K'}_{jj}^2-2{K '}_{ij}=d_{ij}^2 \\ \, \, \, \, {K'}\mathbf{1}=&epsilon;I$$</p>
<p>A little bit of my own understanding:</p>
<p>1) We hope to find a mapping method \Phi that makes 1) the source domain and the target domain as close as possible 2) the variance after mapping is as large as possible. And the kernel matrix K represents the result of this mapping.</p>
<p>2) The kernel matrix itself can be regarded as a similarity table (inner product) between data points (empirical kernel map).</p>
<p>3) After obtaining K, PCA can be used to achieve dimensionality reduction.</p>


<p>Article 4: Pan, S. J., Tsang, I. W., Kwok, J. T., &amp; Yang, Q. (2011). Domain Adaptation via Transfer Component Analysis. IEEE Transactions on Neural Networks.</p>
<p>Article 4 also adopts the method of MMD in Article 3, and improves the method of MMD. The defect of the original MMD method is that 1) the amount of calculation is large and 2) MMD cannot handle points outside the sample. In article 4, the author rewrites $K$ as $ K=(KK^{-\frac{1}{2}})(K^{-\frac{1}{2}}K)$ . At the same time, assuming that there is a matrix $W'\in \mathbf{R}^{(n_1+n_2)&times;m}$ that can transform $(KK^{-\frac{1}{2}})$ into an m-dimensional matrix, And $m&lt;&lt;(n_1+n_2) $. Using W' we can get a new kernel matrix $K'$</p>
<p>$$K' = (KK^{-\frac{1}{2}}W')({W'}^TK^{-\frac{1}{2}}K)$$</p>
<p>Let$ K^{-\frac{1}{2}}W'=W$ , then $K'=KWW^TK$</p>
<p>Then the optimization problem turns into $\min_w \, trace(K'L) $. Also considering the need to maximize the variance, the transformed data is $W^TK$ , therefore, the variance of the data is $W^TKHKW$ , and H is a centralization matrix, which functions to make the data of $W^TK$ symmetrical about the center. $H=I_{n_1+n_2}-(\mathbf{1}/n_1+n_2)\mathbf{1}\mathbf{1}^T$ .</p>
<p>Then the optimization problem becomes:</p>
<p>$$\max_{w} \ \ trace(KW^TLWK)+\lambda trace(WW^T) \\ s.t. W^TKHKW=I$$</p>
<p>Among them, I guarantees the variance of the transformed data, and $trace(WW^T)$ is a regular term to control the complexity of $W$.</p>
<p>In Lagrange, the optimization problem can be transformed into:</p>
<p>$$\max_W \ \ trace((W^T(KLK + \lambda I)W)^{&minus;1}W^TKHKW)$$</p>