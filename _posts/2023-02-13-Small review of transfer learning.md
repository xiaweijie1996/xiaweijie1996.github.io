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
<p><strong>基本概念</strong></p>
<p data-pid="wSB6vtN6">文章1提出，相比于监督学习，人脑其实还有其他的学习机制，即&ldquo;人脑的学习某个概念的过程不仅仅会利用概念相关训练数据集，也会利用已经拥有相关概念的数据（humans often employ more than just the training data for generalization）&rdquo;。</p>
<p data-pid="UkEXhqCJ">文中给出一个例子，对于一个<em>概念学习任务（理解为分类任务或许更直接）</em> ，假设函数 <span class="ztext-math" data-eeimg="1" data-tex="f \in \left\{f_1, f_2,f_3,.. ,f_{n-1}\right\}">f \in \left\{f_1, f_2,f_3,.. ,f_{n-1}\right\}</span>是一个指示函数 <span class="ztext-math" data-eeimg="1" data-tex="f:I \rightarrow \left\{0,1 \right\}">f:I \rightarrow \left\{0,1 \right\}</span> ， <span class="ztext-math" data-eeimg="1" data-tex="f_k">f_k</span> 表示某一物品 <span class="ztext-math" data-eeimg="1" data-tex="k">k</span> 的分类器，且对于任意 <span class="ztext-math" data-eeimg="1" data-tex="x  \in I_k ">x \in I_k </span> ，都有 <span class="ztext-math" data-eeimg="1" data-tex="f(x)=1">f(x)=1</span> ，对于 <span class="ztext-math" data-eeimg="1" data-tex="x \notin I_k">x \notin I_k</span> ，都有 <span class="ztext-math" data-eeimg="1" data-tex="f_k(x)=0">f_k(x)=0</span> 。 <span class="ztext-math" data-eeimg="1" data-tex="X_k (k=1,2,..,n-1)">X_k (k=1,2,..,n-1)</span> 包含前 <span class="ztext-math" data-eeimg="1" data-tex="n-1">n-1</span> 个概念（物品）所有的数据集合 <span class="ztext-math" data-eeimg="1" data-tex="\left\langle x,f_k(x)\right\rangle">\left\langle x,f_k(x)\right\rangle</span> 。那么一个迁移学习的任务可以理解为为当学习新的分类器 <span class="ztext-math" data-eeimg="1" data-tex="f_n">f_n</span> 时，你不仅会利用概念（物品） <span class="ztext-math" data-eeimg="1" data-tex="n">n</span>直接相关的数据集合 ，你也会使用 <span class="ztext-math" data-eeimg="1" data-tex="X_k">X_k</span> 作为辅助数据集合，因此 <span class="ztext-math" data-eeimg="1" data-tex="X_k">X_k</span> 称为支持数据集（support set）。</p>
<p data-pid="oJWtIrvY">迁移学习的本质在于利用不同数据分部中的&ldquo;不变&rdquo;（invariants）,当我学到如何抽取出&ldquo;不变&rdquo;的时候，这些&ldquo;不变&rdquo;就可以辅助新的学习行为。</p>
<p data-pid="tPQnr3de"><strong>基于记忆的学习方法</strong></p>
<p data-pid="unFSzwWM">方法一：k邻近法。</p>
<p data-pid="5AsHV_pr">对于数据 <span class="ztext-math" data-eeimg="1" data-tex="\left\langle x_i,y_i \right\rangle ">\left\langle x_i,y_i \right\rangle </span> ,可以通过找到在 <span class="ztext-math" data-eeimg="1" data-tex="X_k">X_k</span> 中距离<span class="ztext-math" data-eeimg="1" data-tex="\left\langle x_i,y_i \right\rangle ">\left\langle x_i,y_i \right\rangle </span> 最近的 <span class="ztext-math" data-eeimg="1" data-tex="k">k</span> 个点，并求出 <span class="ztext-math" data-eeimg="1" data-tex="y_i = \frac{1}{k} \sum_{j=1}^k y_j">y_i = \frac{1}{k} \sum_{j=1}^k y_j</span> 来求得 <span class="ztext-math" data-eeimg="1" data-tex="y_i">y_i</span> 的值。</p>
<p data-pid="sDBqOhJQ">方法二：Shepard，更加数据 <span class="ztext-math" data-eeimg="1" data-tex="\left\langle x_i,y_i \right\rangle ">\left\langle x_i,y_i \right\rangle </span> 与 <span class="ztext-math" data-eeimg="1" data-tex="X_k">X_k</span> 中所有点的距离作为权重来平均 <span class="ztext-math" data-eeimg="1" data-tex="Y">Y</span> 来求出 <span class="ztext-math" data-eeimg="1" data-tex="y_i">y_i</span> 。</p>
<p data-pid="SrD5dHPB"><span class="ztext-math" data-eeimg="1" data-tex="S(x_i)=(\sum_{\left\langle x_i,y_i \right\rangle \in X} \frac{y_i}{||x-x_i||^2+\epsilon}) &middot;c">S(x_i)=(\sum_{\left\langle x_i,y_i \right\rangle \in X} \frac{y_i}{||x-x_i||^2+\epsilon}) &middot;c</span></p>
<p data-pid="f3KAfI-z"><span class="ztext-math" data-eeimg="1" data-tex="c= \sum_{\left\langle x_i,y_i \right\rangle \in X} \frac{y_i}{||x-x_i||^2+\epsilon}">c= \sum_{\left\langle x_i,y_i \right\rangle \in X} \frac{y_i}{||x-x_i||^2+\epsilon}</span></p>
<p data-pid="2ftWOSKp"><span class="ztext-math" data-eeimg="1" data-tex="\epsilon">\epsilon</span> 为一个较小的常数防止除以0。</p>
<p data-pid="1_TE_Hoi">方法三： 学习到一组新的潜在变量来表示原始变量。</p>
<p data-pid="qIiJQ28x"><span class="ztext-math" data-eeimg="1" data-tex="E:=\sum_{k=1}^{n-1} \sum_{\left\langle x,y=1 \right\rangle \in X_k} (\sum_{\left\langle x',y'=1\right\rangle \in X_k}||g(x)-g(x')||-\sum_{\left\langle x',y'=0 \right\rangle \in X_k}||g(x)-g(x')|| )">E:=\sum_{k=1}^{n-1} \sum_{\left\langle x,y=1 \right\rangle \in X_k} (\sum_{\left\langle x',y'=1\right\rangle \in X_k}||g(x)-g(x')||-\sum_{\left\langle x',y'=0 \right\rangle \in X_k}||g(x)-g(x')|| )</span></p>
<p data-pid="iCT2vRbb">通过最小化 <span class="ztext-math" data-eeimg="1" data-tex="E">E</span> 我们希望找到一个对 <span class="ztext-math" data-eeimg="1" data-tex="x">x</span> 的最佳映射 <span class="ztext-math" data-eeimg="1" data-tex="g">g</span>。 假设新的学习任务同样适合通过 <span class="ztext-math" data-eeimg="1" data-tex="g">g</span> 得到的潜在变量，那么我们就可以通过 <span class="ztext-math" data-eeimg="1" data-tex="g">g</span> 生成新任务数据的潜在变量，然后使得方法一和方法二得到更好的效果。</p>
<p data-pid="ORyV8aft">方法四：学习一个距离函数。</p>
<p data-pid="qtTyGmLt">我们希望学习到一个这样的距离函数 <span class="ztext-math" data-eeimg="1" data-tex="d">d</span> 满足：</p>
<p data-pid="yASy9SgB"><span class="ztext-math" data-eeimg="1" data-tex="d(x,x')=1, if \,  y = y'=1">d(x,x')=1, if \, y = y'=1</span></p>
<p data-pid="asFz8yFx"><span class="ztext-math" data-eeimg="1" data-tex="d(x,x')=0, if \, y \neq y'">d(x,x')=0, if \, y \neq y'</span></p>
<p data-pid="TLbuJyTY">学到这个距离函数的方法有很多，文中采用了神经网络的方法。一旦得到一个 <span class="ztext-math" data-eeimg="1" data-tex="d">d</span> 。我们可以通过下式得到分类结果。</p>
<p data-pid="jGjq3-NM"><span class="ztext-math" data-eeimg="1" data-tex="prob(f_n(x)=1)=1-(1+\prod_{\left\langle x',y'=1\right\rangle \in X_k}\frac{d(x,x')}{1-d(x,x')})">prob(f_n(x)=1)=1-(1+\prod_{\left\langle x',y'=1\right\rangle \in X_k}\frac{d(x,x')}{1-d(x,x')})</span></p>
<p data-pid="UPKRnSCO"><strong>基于神经网络的方法</strong><br />方法一：基于线索学习</p>
<p data-pid="76hkoEo7">上面描述的基于记忆学习的方法三只考虑了 <span class="ztext-math" data-eeimg="1" data-tex="X_k">X_k</span> 而没有考虑对于问题 <span class="ztext-math" data-eeimg="1" data-tex="n">n</span> 的数据，因为可以训练一个神经网络同时缩小<span class="ztext-math" data-eeimg="1" data-tex="X_k">X_k</span> 和问题 <span class="ztext-math" data-eeimg="1" data-tex="n">n</span> 的数据。</p>
<p data-pid="_PZlyUk3">方法二：Explanation-Based Neural Network Learning</p>
<p data-pid="4GMEz1DH">这个方法在Paper里我没太看明白，欢迎懂得同学告诉我，在这里谢谢老铁。</p>
<p class="ztext-empty-paragraph">&nbsp;</p>
<h3>文章2：Daum&eacute; III, Hal. "Frustratingly easy domain adaptation."<em>arXiv preprint arXiv:0907.1815</em>(2009).</h3>
<p data-pid="hJWdLCGi"><strong>基本概念</strong></p>
<p data-pid="soHrACCM">文章2提出了一种非常简单的data augmentation的办法。对于源域（source domain）和目标域（target domain），他们的特征可以由三个部分组成&ldquo;通用特征&rdquo;，&ldquo;源域专属特征&rdquo;，&ldquo;目标域专属特征&rdquo;。其中源域由&ldquo;通用特征&rdquo;，&ldquo;源域专属特征&rdquo;组成，目标域由&ldquo;通用特征&rdquo;，&ldquo;目标域专属特征&rdquo;组成。源域映射函数 <span class="ztext-math" data-eeimg="1" data-tex="\Phi_s">\Phi_s</span> 和目标域映射函数 <span class="ztext-math" data-eeimg="1" data-tex="\Phi_t">\Phi_t</span> 分别为：</p>
<p data-pid="IcOnUWtz"><span class="ztext-math" data-eeimg="1" data-tex="\Phi_s(x)= \left\langle \mathbf{x},\mathbf{x},\mathbf{0}\right\rangle   ">\Phi_s(x)= \left\langle \mathbf{x},\mathbf{x},\mathbf{0}\right\rangle </span></p>
<p data-pid="Nu0P0RUH"><span class="ztext-math" data-eeimg="1" data-tex="\Phi_t(x)= \left\langle \mathbf{x},\mathbf{0},\mathbf{x} \right\rangle">\Phi_t(x)= \left\langle \mathbf{x},\mathbf{0},\mathbf{x} \right\rangle</span></p>
<p data-pid="WpB4-0D_"><strong>核函数化</strong></p>
<p data-pid="QE7ICEHt">上面的方法还可以核函数化，对与一个核函数 <span class="ztext-math" data-eeimg="1" data-tex="K">K</span> （ <span class="ztext-math" data-eeimg="1" data-tex="K">K</span> 半正定）</p>
<p data-pid="GDKa-tzI"><span class="ztext-math" data-eeimg="1" data-tex="\Phi_s(x)= \left\langle\Phi(\mathbf{x}),\Phi(\mathbf{x}),\mathbf{0}\right\rangle   ">\Phi_s(x)= \left\langle\Phi(\mathbf{x}),\Phi(\mathbf{x}),\mathbf{0}\right\rangle </span></p>
<p data-pid="Gt652ETL"><span class="ztext-math" data-eeimg="1" data-tex="\Phi_t(x)= \left\langle \Phi(\mathbf{x}),\mathbf{0},\Phi(\mathbf{x}) \right\rangle">\Phi_t(x)= \left\langle \Phi(\mathbf{x}),\mathbf{0},\Phi(\mathbf{x}) \right\rangle</span></p>
<p data-pid="DzuocaH4">文中用线性核函数 <span class="ztext-math" data-eeimg="1" data-tex="K=\left\langle \Phi (x), \Phi(x') \right\rangle">K=\left\langle \Phi (x), \Phi(x') \right\rangle</span> 举例得到：</p>
<p data-pid="DoXGpTgr"><span class="ztext-math" data-eeimg="1" data-tex=" K=\left\{   \begin{array}{**rcl**}     2K(x,x')\ ,\    same.domain&amp; \\    K(x,x')\ \ , diff.domain &amp;\\     \end{array} \right.   "> K=\left\{ \begin{array}{**rcl**} 2K(x,x')\ ,\ same.domain&amp; \\ K(x,x')\ \ , diff.domain &amp;\\ \end{array} \right. </span></p>
<p class="ztext-empty-paragraph">&nbsp;</p>
<h3>文章3：Pan, Sinno Jialin, James T. Kwok, and Qiang Yang. "Transfer learning via dimensionality reduction."<em>AAAI</em>. Vol. 8. 2008.</h3>
<p data-pid="TnwrnlFm"><strong>基本概念</strong></p>
<p data-pid="Fr9dKiVD">文章3提出了一种通过降维来实现迁移学习的方法，算法的目的在于将源域数据与目标域数据投影到一个新的空间中，并在新的空间中希望1）源域与目标的分部尽量接近（寻找&ldquo;迁移的特征&rdquo;）2）数据本身的分部的方差尽可能的大（保存原有信息，类似PCA）3）满足其他限定条件。在寻找到合适的投影空间后，可以在该空间训练其他机器学习模型以达到迁移学习的目的。</p>
<p data-pid="tos-OVrk"><strong>Maximum mean discrepancy（MMD）</strong></p>
<p data-pid="2FF9uNLe">为了实现目的&ldquo;源域与目标的分部尽量接近&rdquo;，我们首先需要一个投影函数 <span class="ztext-math" data-eeimg="1" data-tex="\Phi(&middot;):\mathcal{X}\rightarrow \mathcal{H}">\Phi(&middot;):\mathcal{X}\rightarrow \mathcal{H}</span> 。投影后的新空间成为<em>再生核希尔伯特空间（RKHS）</em>。</p>
<p data-pid="Fi4YLZD6">然后我们需要一个函数去测量投影后 <span class="ztext-math" data-eeimg="1" data-tex="\Phi(X_s), \Phi(X_t)">\Phi(X_s), \Phi(X_t)</span> 的距离，文章选用了MMD作为距离衡量。在RKHS中MMD的经验估计公式为：</p>
<p data-pid="q167f7Hc"><span class="ztext-math" data-eeimg="1" data-tex="dis(X_s,X_t)=||\frac{1}{n_s}\sum_{i=1}^{n_s} \Phi(x_{i}^s)-\frac{1}{n_t}\sum_{j=1}^{n_t} \Phi(x_{j}^t)||_{\mathcal{H}}">dis(X_s,X_t)=||\frac{1}{n_s}\sum_{i=1}^{n_s} \Phi(x_{i}^s)-\frac{1}{n_t}\sum_{j=1}^{n_t} \Phi(x_{j}^t)||_{\mathcal{H}}</span></p>
<p data-pid="FuSlZhUe">因此，问题转化为寻找一个最小的 <span class="ztext-math" data-eeimg="1" data-tex="dis(X_s,X_t)">dis(X_s,X_t)</span> 。</p>
<p data-pid="q7-lrDaO">事实上 <span class="ztext-math" data-eeimg="1" data-tex="dis(X_s,X_t)=trace(KL)">dis(X_s,X_t)=trace(KL)</span></p>
<p data-pid="SDfwd39A"><span class="ztext-math" data-eeimg="1" data-tex="K=\left[ \begin{array}{ccc} K_{s,s} &amp;K_{s,t}\\ K_{t,s} &amp; K_{t,t}\\ \end{array}  \right ] \in \mathbb{R}^{(m+n)&times;(m+N)}">K=\left[ \begin{array}{ccc} K_{s,s} &amp;K_{s,t}\\ K_{t,s} &amp; K_{t,t}\\ \end{array} \right ] \in \mathbb{R}^{(m+n)&times;(m+N)}</span></p>
<p data-pid="jiwZK1EO"><span class="ztext-math" data-eeimg="1" data-tex=" L=\left\{   \begin{array}{**rcl**}     \frac{1}{{n_s}^2}\ ,\    x_i,x_j \in X_s&amp; \\    \frac{1}{{n_t}^2}\ ,\    x_i,x_j \in X_t&amp; \\ \frac{1}{{n_tn_s}}\ ,\    otherwise&amp; \\  \end{array} \right.   "> L=\left\{ \begin{array}{**rcl**} \frac{1}{{n_s}^2}\ ,\ x_i,x_j \in X_s&amp; \\ \frac{1}{{n_t}^2}\ ,\ x_i,x_j \in X_t&amp; \\ \frac{1}{{n_tn_s}}\ ,\ otherwise&amp; \\ \end{array} \right. </span></p>
<p data-pid="Jtf2-nMc">从 <span class="ztext-math" data-eeimg="1" data-tex="dis">dis</span> 到 <span class="ztext-math" data-eeimg="1" data-tex="trace">trace</span> 如果不理解计算，参考王老师：<a class="internal" href="https://zhuanlan.zhihu.com/p/63026435">王晋东不在家：MMD计算的核技巧公式推导</a></p>
<p data-pid="XjEpVj7p">因为 <span class="ztext-math" data-eeimg="1" data-tex="L">L</span> 是一个固定的常数，因为最小化 <span class="ztext-math" data-eeimg="1" data-tex="dis">dis</span> 的问题转化为一个半正定规划问题：寻找到一个 <span class="ztext-math" data-eeimg="1" data-tex="K">K</span> 使得 <span class="ztext-math" data-eeimg="1" data-tex="dis">dis</span> 最小。</p>
<p data-pid="6-E72Uyj">但是到这一不其实我们只实现了最小化源域到目标域的距离，我们还没有实现希望投影后的数据方差最大。如何实现呢？在原本的优化问题上加入一个正则项 <span class="ztext-math" data-eeimg="1" data-tex="trace(K)">trace(K)</span> 代表数据的方差（因为0是中心点 <span class="ztext-math" data-eeimg="1" data-tex="(x-0)^2=x^2">(x-0)^2=x^2</span> ，看后面的解释）。因此优化问题变为：</p>
<p data-pid="PspyyJ_e"><span class="ztext-math" data-eeimg="1" data-tex="\min_{k} \ \ trace(KL)-\lambda trace(K)">\min_{k} \ \ trace(KL)-\lambda trace(K)</span></p>
<p data-pid="lzl2KZ3u">但是这样依旧有些不够，文中加入了其他两个限制条件1）投影后的空间距离是稳定的 <span class="ztext-math" data-eeimg="1" data-tex="K_{ii}^2+K_{jj}^2-2K_{ij}=d_{ij}^2">K_{ii}^2+K_{jj}^2-2K_{ij}=d_{ij}^2</span> 2）投影后的数据以原点为中心 <span class="ztext-math" data-eeimg="1" data-tex="K\mathbf{1}=\mathbf{0}">K\mathbf{1}=\mathbf{0}</span> 。此外为了保证 <span class="ztext-math" data-eeimg="1" data-tex="K">K</span> 是存在的，根据&ldquo;If a kernel matrix K can be written as <span class="ztext-math" data-eeimg="1" data-tex="K = K' + &epsilon;I">K = K' + &epsilon;I</span> , (5) where <span class="ztext-math" data-eeimg="1" data-tex="&epsilon; &gt; 0">&epsilon; &gt; 0</span> , K' is position semi-definate and <span class="ztext-math" data-eeimg="1" data-tex="I">I</span> is the identity matrix, then the kernel function corresponding to K is universal &rdquo; 将 <span class="ztext-math" data-eeimg="1" data-tex="K">K</span> 改写为 <span class="ztext-math" data-eeimg="1" data-tex="K=K'+&epsilon; I">K=K'+&epsilon; I</span> 。</p>
<p data-pid="s9c28yIF">优化问题最终变为：</p>
<p data-pid="DbwyNdcM"><span class="ztext-math" data-eeimg="1" data-tex="\min_{k'} \ \ trace(K'L)-\lambda trace(K') \\ s.t. {K'}_{ii}^2+{K'}_{jj}^2-2{K'}_{ij}=d_{ij}^2 \\ \, \, \, \, {K'}\mathbf{1}=&epsilon;I">\min_{k'} \ \ trace(K'L)-\lambda trace(K') \\ s.t. {K'}_{ii}^2+{K'}_{jj}^2-2{K'}_{ij}=d_{ij}^2 \\ \, \, \, \, {K'}\mathbf{1}=&epsilon;I</span></p>
<p data-pid="RjPv5o8X">一点自己的理解：</p>
<p data-pid="gvNn_hOm">1）我们希望找到一种映射方式 <span class="ztext-math" data-eeimg="1" data-tex="\Phi">\Phi</span> 使得1）源域与目标域尽可能的接近2）映射后的方差尽可能的大。而核矩阵 <span class="ztext-math" data-eeimg="1" data-tex="K">K</span> 代表了这种映射的结果。</p>
<p data-pid="caLS74vz">2）核矩阵本身可以看成数据点之间的相似表（内积）(empirical kernel map) 。</p>
<p data-pid="GMYmytqX">3）获得 <span class="ztext-math" data-eeimg="1" data-tex="K">K</span> 后，可以使用PCA实现降维。</p>
<p class="ztext-empty-paragraph">&nbsp;</p>
<h3>文章4：Pan, S. J., Tsang, I. W., Kwok, J. T., &amp; Yang, Q. (2011). Domain Adaptation via Transfer Component Analysis. IEEE Transactions on Neural Networks.</h3>
<p data-pid="IFNLfrkt">文章4同样采用了文章3中MMD的方法，将MMD 的方法进行了改进。原来MMD的方法的缺陷在于1）计算量较大2）对于样本外的点MMD无法处理。在文章4中，作者将 <span class="ztext-math" data-eeimg="1" data-tex="K">K</span> 改写为 <span class="ztext-math" data-eeimg="1" data-tex="K=(KK^{-\frac{1}{2}})(K^{-\frac{1}{2}}K)">K=(KK^{-\frac{1}{2}})(K^{-\frac{1}{2}}K)</span> 。同时，假设存在一个矩阵 <span class="ztext-math" data-eeimg="1" data-tex="W'">W'</span><span class="ztext-math" data-eeimg="1" data-tex="\in \mathbf{R}^{(n_1+n_2)&times;m}">\in \mathbf{R}^{(n_1+n_2)&times;m}</span> 可以将 <span class="ztext-math" data-eeimg="1" data-tex="(KK^{-\frac{1}{2}})">(KK^{-\frac{1}{2}})</span> 转化为一个 <span class="ztext-math" data-eeimg="1" data-tex="m">m</span> 维度的矩阵，且 <span class="ztext-math" data-eeimg="1" data-tex="m&lt;&lt;(n_1+n_2)">m&lt;&lt;(n_1+n_2)</span> 。使用 <span class="ztext-math" data-eeimg="1" data-tex="W'">W'</span> 我们可以得到一个新的核矩阵 <span class="ztext-math" data-eeimg="1" data-tex="K'">K'</span></p>
<p data-pid="4LTyiJEg"><span class="ztext-math" data-eeimg="1" data-tex="K' = (KK^{-\frac{1}{2}}W')({W'}^TK^{-\frac{1}{2}}K)">K' = (KK^{-\frac{1}{2}}W')({W'}^TK^{-\frac{1}{2}}K)</span></p>
<p data-pid="AcicUEjD">设 <span class="ztext-math" data-eeimg="1" data-tex="K^{-\frac{1}{2}}W'=W">K^{-\frac{1}{2}}W'=W</span> , 那么 <span class="ztext-math" data-eeimg="1" data-tex="K'=KWW^TK">K'=KWW^TK</span></p>
<p data-pid="DZ6mRDTC">那么优化问题转变为 <span class="ztext-math" data-eeimg="1" data-tex="\min_w \, trace(K'L)">\min_w \, trace(K'L)</span> 。同样考虑到需要最大化方差，转化后的数据为 <span class="ztext-math" data-eeimg="1" data-tex="W^TK">W^TK</span> ，因此，数据的方差为 <span class="ztext-math" data-eeimg="1" data-tex="W^TKHKW">W^TKHKW</span> , <span class="ztext-math" data-eeimg="1" data-tex="H">H</span> 是一个中心化矩阵，作用是将 <span class="ztext-math" data-eeimg="1" data-tex="W^TK">W^TK</span> 的数据关于中心对称。 <span class="ztext-math" data-eeimg="1" data-tex="H=I_{n_1+n_2}-(\mathbf{1}/n_1+n_2)\mathbf{1}\mathbf{1}^T">H=I_{n_1+n_2}-(\mathbf{1}/n_1+n_2)\mathbf{1}\mathbf{1}^T</span> 。</p>
<p data-pid="ufidqUXO">这时优化问题转变为：</p>
<p data-pid="pad6hETw"><span class="ztext-math" data-eeimg="1" data-tex="\max_{w} \ \ trace(KW^TLWK)+\lambda trace(WW^T) \\ s.t.  W^TKHKW=I">\max_{w} \ \ trace(KW^TLWK)+\lambda trace(WW^T) \\ s.t. W^TKHKW=I</span></p>
<p data-pid="a2SzJFNJ">其中 <span class="ztext-math" data-eeimg="1" data-tex="I">I</span> 保证了转化后的数据的方差， <span class="ztext-math" data-eeimg="1" data-tex="trace(WW^T)">trace(WW^T)</span> 为正则项，控制 <span class="ztext-math" data-eeimg="1" data-tex="W">W</span> 的复杂度。</p>
<p data-pid="9KuSYJOp">在通过拉格朗日，优化问题可以转化为：</p>
<p data-pid="_IeewpQI"><span class="ztext-math" data-eeimg="1" data-tex="\max_W trace((W^T(KLK + \lambda I)W)^{&minus;1}W^TKHKW)">\max_W trace((W^T(KLK + \lambda I)W)^{&minus;1}W^TKHKW)</span></p>
<p class="ztext-empty-paragraph">&nbsp;</p>
<h3>文章5：Ghifary, Muhammad, W. Bastiaan Kleijn, and Mengjie Zhang. "Domain adaptive neural networks for object recognition."<em>PRICAI 2014: Trends in Artificial Intelligence: 13th Pacific Rim International Conference on Artificial Intelligence, Gold Coast, QLD, Australia, December 1-5, 2014. Proceedings 13</em>. Springer International Publishing, 2014.</h3>
<p data-pid="VuPJFYYo">文章5通过神经网络的方法实现了domain adaptation。方法的核心是将原本神经网络的损失加上MMD。</p>
<p data-pid="94h_d_yj">神经网络的损失函数为：</p>
<p data-pid="8SwVfrby">L_the {DaNN}=L_{NN}+\lambda MMD^2(q_s,q_t)</p>
<p data-pid="5Vs9Z3qk"><span class="ztext-math" data-eeimg="1" data-tex="L_{DaNN}">L_{DaNN}</span> 我神经网络的总损失， <span class="ztext-math" data-eeimg="1" data-tex="L_{NN}">L_{NN}</span> 为一般神经网络损失（文中为交叉熵）， <span class="ztext-math" data-eeimg="1" data-tex="\lambda">\lambda</span> 是MMD的权重。 <span class="ztext-math" data-eeimg="1" data-tex="q_s,q_t">q_s,q_t</span> 分别为源域数据 <span class="ztext-math" data-eeimg="1" data-tex="x_s">x_s</span> 和目标域数据 <span class="ztext-math" data-eeimg="1" data-tex="x_t">x_t</span> 在Hidden layer输出的representation。假设输入后的第一层为hidden layer <span class="ztext-math" data-eeimg="1" data-tex="q_s=\sigma(W^Tx_s+b)">q_s=\sigma(W^Tx_s+b)</span> ， <span class="ztext-math" data-eeimg="1" data-tex="q_t=\sigma(W^Tx_t+b)">q_t=\sigma(W^Tx_t+b)</span> 。</p>
<p data-pid="q60GlA0e">网络更新的方法为：</p>
<ol>
<li data-pid="o5aYG4xz">根据 <span class="ztext-math" data-eeimg="1" data-tex="L_{NN}">L_{NN}</span> 反向传播更新网络参数。</li>
<li data-pid="Gb00SOno">根据 <span class="ztext-math" data-eeimg="1" data-tex="\lambda MMD^2(q_s,q_t)">\lambda MMD^2(q_s,q_t)</span> 更新hidden layer的参数（假设hidder layer为第三层，那么只更新一到三层，不更新后面三层以后的网络参数）</li>
</ol>
<p class="ztext-empty-paragraph">&nbsp;</p>
<h3>文章6：Ganin, Yaroslav, and Victor Lempitsky. "Unsupervised domain adaptation by backpropagation."<em>International conference on machine learning</em>. PMLR, 2015.</h3>
<p data-pid="CaKhg2uK">文章6本质上是提出了一种神经网络结构来寻找一个可以最小化源域和目标域分布距离的空间。神经网络由三个部分构成：</p>
<ol>
<li data-pid="qsaVM2wT"><span class="ztext-math" data-eeimg="1" data-tex="G_f(&middot;; \theta_f)">G_f(&middot;; \theta_f)</span> 将输入 <span class="ztext-math" data-eeimg="1" data-tex="x">x</span> 转化为特征 <span class="ztext-math" data-eeimg="1" data-tex="f">f</span> 。</li>
<li data-pid="-hIXFgug"><span class="ztext-math" data-eeimg="1" data-tex="G_y(&middot;;\theta_y)">G_y(&middot;;\theta_y)</span> 输入特征 <span class="ztext-math" data-eeimg="1" data-tex="f">f</span>，输出对标签 <span class="ztext-math" data-eeimg="1" data-tex="y">y</span> 的预测 。</li>
<li data-pid="KcReok99"><span class="ztext-math" data-eeimg="1" data-tex="G_d(&middot;;\theta_d)">G_d(&middot;;\theta_d)</span> 输入特征 <span class="ztext-math" data-eeimg="1" data-tex="f">f</span> ，输出对域的预测（源域或目标域）。</li>
</ol>
<p data-pid="2kAcYuz_">在训练过程中，我们希望通过 <span class="ztext-math" data-eeimg="1" data-tex="G_f">G_f</span> 得到的特征最大化 <span class="ztext-math" data-eeimg="1" data-tex="L_d">L_d</span> ，即使源域和目标域的 <span class="ztext-math" data-eeimg="1" data-tex="f_s,f_t">f_s,f_t</span> 尽量接近。但是同时我们希望通过 <span class="ztext-math" data-eeimg="1" data-tex="G_d">G_d</span> 得到最小的 <span class="ztext-math" data-eeimg="1" data-tex="L_d">L_d</span> 。再根据 <span class="ztext-math" data-eeimg="1" data-tex="G_y">G_y</span> 来调整输出 <span class="ztext-math" data-eeimg="1" data-tex="f">f</span> 的合理性。本质上是一种对抗式的网络，通过这种方式训练得到一个合理的对 <span class="ztext-math" data-eeimg="1" data-tex="x">x</span> 的影射方式 <span class="ztext-math" data-eeimg="1" data-tex="G_f">G_f</span> 。</p>
<p class="ztext-empty-paragraph">&nbsp;</p>
<h3>文章7：Zhuang, Fuzhen, et al. "Supervised representation learning: Transfer learning with deep autoencoders."<em>Twenty-fourth international joint conference on artificial intelligence</em>. 2015.</h3>
<p data-pid="g1MGrX9m">文章7提出了一种通过自编码器的结构学习并找到new representation的方法，该方法还嵌入了源域的标签数据优化网络训练。需要注意的是整个模型中源域数据和目标域数据的自编码器共享参数，模型本质通过模型的损失函数就可以窥见：</p>
<p data-pid="UB5eNTqh"><span class="ztext-math" data-eeimg="1" data-tex="J = J_r(x, \hat{x}) + &alpha;&Gamma;(&xi; (s) , &xi; (t) ) + &beta;L(&theta;, &xi; ^{(s)} ) + &gamma;Ω(W, b,W' , b' )">J = J_r(x, \hat{x}) + &alpha;&Gamma;(&xi; (s) , &xi; (t) ) + &beta;L(&theta;, &xi; ^{(s)} ) + &gamma;Ω(W, b,W' , b' )</span></p>
<p data-pid="00XG0nwa">其中 <span class="ztext-math" data-eeimg="1" data-tex="J_r">J_r</span> 为自编码器恢复输入 <span class="ztext-math" data-eeimg="1" data-tex="x">x</span> 带来的损失, <span class="ztext-math" data-eeimg="1" data-tex="Ω(W, b,W' , b' )">Ω(W, b,W' , b' )</span> 为正则项控制参数复杂度, <span class="ztext-math" data-eeimg="1" data-tex="L(&theta;, &xi; ^{(s)} )">L(&theta;, &xi; ^{(s)} )</span> 为通过softmax预测源域数据标签带来的损失， <span class="ztext-math" data-eeimg="1" data-tex="&Gamma;(&xi; (s) , &xi; (t) ) ">&Gamma;(&xi; (s) , &xi; (t) ) </span> 为 <span class="ztext-math" data-eeimg="1" data-tex="P_s, P_t">P_s, P_t</span> 之间KL散度的带来的损失，目的是希望输出的 <span class="ztext-math" data-eeimg="1" data-tex="&xi; (s),&xi; (t)">&xi; (s),&xi; (t)</span> 尽可能近似， <span class="ztext-math" data-eeimg="1" data-tex="&Gamma;(&xi; (s) , &xi; (t) ) = D_{KL}(P_s||P_t) + D_{KL}(P_t||P_s)">&Gamma;(&xi; (s) , &xi; (t) ) = D_{KL}(P_s||P_t) + D_{KL}(P_t||P_s)</span> 其中：</p>
<p data-pid="vX1WO4n4"><span class="ztext-math" data-eeimg="1" data-tex="P_s'=\frac{1}{n_s} \sum_{i=1}^{n_s} &xi; ^{(s)}_i, \,\,P_s = \frac{P_s'}{\sum P_s'}">P_s'=\frac{1}{n_s} \sum_{i=1}^{n_s} &xi; ^{(s)}_i, \,\,P_s = \frac{P_s'}{\sum P_s'}</span></p>
<p data-pid="WOW6KVIz"><span class="ztext-math" data-eeimg="1" data-tex="P_t'=\frac{1}{n_t} \sum_{i=1}^{n_t} &xi; ^{(t)}_i, \,\,P_t = \frac{P_t'}{\sum P_t'}">P_t'=\frac{1}{n_t} \sum_{i=1}^{n_t} &xi; ^{(t)}_i, \,\,P_t = \frac{P_t'}{\sum P_t'}</span></p>
<p data-pid="JJ2kgJi5">（虽然我个人感觉这个 <span class="ztext-math" data-eeimg="1" data-tex="&Gamma;">&Gamma;</span> 的数学设计不完美，不过也确实能达到需要的效果）</p>
<p class="ztext-empty-paragraph">&nbsp;</p>
<h3>文章8：Long, Mingsheng, et al. "Learning transferable features with deep adaptation networks."<em>International conference on machine learning</em>. PMLR, 2015.</h3>
<p data-pid="ew0izode">上图展示了文章8提出的算法结构，我个人感觉其实这个结构表达地反而没有另一篇Review里面的清晰，这里也提供下Review里面的结构图(Zhuang, Fuzhen, et al. "A comprehensive survey on transfer learning."<em>Proceedings of the IEEE</em>109.1 (2020): 43-76.)。</p>
<p data-pid="a-MrXHGA">训练过程中， <span class="ztext-math" data-eeimg="1" data-tex="X_s,X_t">X_s,X_t</span> 被喂进网络里面，第六层网络开始 走<span class="ztext-math" data-eeimg="1" data-tex="X_s">X_s</span> 走上面的网络 <span class="ztext-math" data-eeimg="1" data-tex="X_t">X_t</span> 走下面的网络，其中上面的网络因为 <span class="ztext-math" data-eeimg="1" data-tex="X_s">X_s</span> 是有标签的所以可以直接训练。但是因为目标域是没有标签的，所以如果不通过特殊的手段是无法训练网络的，那作者用了什么手段呢？就是通过最小化在上图中 <span class="ztext-math" data-eeimg="1" data-tex="6-8">6-8</span> 层网络之间的MK-MMD来实现对网络的训练。当训练到一定程度后，就可以用下面的网络来直接预测 <span class="ztext-math" data-eeimg="1" data-tex="X_t">X_t</span> 的标签（至少论文是这么说的，个人感觉不是很直观，可能是我数学不好）。</p>
<p data-pid="a-MrXHGA">&nbsp;</p>
<h3>文章9:Tzeng, Eric, et al. "Adversarial discriminative domain adaptation."<em>Proceedings of the IEEE conference on computer vision and pattern recognition</em>. 2017.</h3>
<p>&nbsp;</p>
<p data-pid="kVP6DJc7">这篇文章感觉和之间的文章6思路近似，就是1）通过一个discriminator来预测domian 2)通过对抗式的损失函数来学到一个mapping<span class="ztext-math" data-eeimg="1" data-tex="M_t">M_t</span>。 <span class="ztext-math" data-eeimg="1" data-tex="M_t">M_t</span> 的作用就是最小化mapping后的源域与目标域的距离，从而可以在mapping后的数据上训练其他机器学习算法。全文的核心思想就在这几行损失函数上：</p>
<p data-pid="53nnK0Jk">第一个损失函数代表在目标域 <span class="ztext-math" data-eeimg="1" data-tex="M_s(X_s)">M_s(X_s)</span> 上的分类器<strong>(投影后)</strong>的损失。</p>
<p data-pid="43eeogm8">第二个损失函数代表Discriminator(域分类器)的损失。</p>
<p data-pid="p-PiNysD">第三个损失函数代表目标域投影函数 <span class="ztext-math" data-eeimg="1" data-tex="M_t">M_t</span> 的损失，和Discriminator(域分类器)的损失相反，体现对抗性。</p>
<p data-pid="w9IOwuav">训练过程如下图：</p>
<p data-pid="HV-AoJLE">1）首先通过第一个损失函数训练好一个在目标域 <span class="ztext-math" data-eeimg="1" data-tex="M_s(X_s)">M_s(X_s)</span> 上的分类器，完成这一步后你会得到一个分类器 <span class="ztext-math" data-eeimg="1" data-tex="C">C</span> 和一个源域投影函数 <span class="ztext-math" data-eeimg="1" data-tex="M_s">M_s</span> ，这一步对应pre-training。 2) 固定好 <span class="ztext-math" data-eeimg="1" data-tex="M_s">M_s</span> 通过第二个损失函数和第三个损失函数训练出一个 <span class="ztext-math" data-eeimg="1" data-tex="M_t">M_t</span> 和 <span class="ztext-math" data-eeimg="1" data-tex="D">D</span> ，这一步对应Adversarial adaptaiton。3）用之前训练好的 <span class="ztext-math" data-eeimg="1" data-tex="M_s">M_s</span> 和 <span class="ztext-math" data-eeimg="1" data-tex="C">C</span> 预测标签。</p>
<p class="ztext-empty-paragraph">&nbsp;</p>
<p data-pid="4cSXRdh0">暂时就写这么多了，如有问题非常欢迎指正，有的新发表的论文欢迎推荐~~</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<div class="Post-Sub Post-NormalSub">&nbsp;</div>