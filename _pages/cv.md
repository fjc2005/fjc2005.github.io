---
layout: archive
title: "CV"
permalink: /cv/
author_profile: true
redirect_from:
  - /resume
---

{% include base_path %}

Education
======
* B.S. in Computer Science (**Elite Class**), Nankai University, Sep. 2023 – Present
  * GPA: 3.5 / 4.0
  * Advisors: Prof. Chongyi Li & Prof. Chunle Guo
  * Teaching Assistant: *Introduction to Artificial Intelligence* (Fall 2025)
  * Honor: Nankai University Innovation Scholarship

Research Experience
======
* **AIGC Text Detection** (Jan. 2025 – Present)
  * VCIP Lab, Nankai University
  * Built a more robust machine-generated text detection and evaluation system. Proposed a novel optimization strategy that reduces computation cost while improving performance by ~70% relative to previous SOTA. Also proposed a comprehensive benchmark dataset for robust evaluation.
  * Result: Paper *DetectAnyLLM* accepted at ACM MM 2025 (CCF-A) as **Oral**.

* **Text/Image to SVG** (Sep. 2025 – Present)
  * VCIP Lab, Nankai University
  * Investigating limitations of existing text/image-to-SVG models (e.g., OmniSVG, InternSVG). Exploring Continue-Pretraining and SFT+GRPO strategies to improve LLM understanding of SVG data.

* **Text-to-Image Quality Assessment** (Sep. 2024 – Nov. 2024)
  * VCIP Lab, Nankai University
  * Constructed a large-scale fine-grained T2I dataset and fine-tuned BLIP for human-aligned scoring with fine-grained capability. Benchmarked 20+ T2I models.
  * Contribution: Responsible for structural image quality evaluation task and contributed to the innovative BLIP fine-tuning strategy design.
  * Result: Paper *EvalMuse-40K* accepted at AAAI 2026 (CCF-A).

Publications
======
  <ul>{% for post in site.publications reversed %}
    {% include archive-single-cv.html %}
  {% endfor %}</ul>

Awards & Competitions
======
* **National Special Prize**, Challenge Cup "AI+" Track (Oct.–Nov. 2025)
  * Project: *"婴语新声"* — Multimodal LLM-based Infant Behavior Semantic Analysis and Monitoring System
* **National First Prize**, CCF-TCARCH Architecture Challenge (Sep. 2025)
* Nankai University Innovation Scholarship

Service
======
* Reviewer: IEEE Transactions on Pattern Analysis and Machine Intelligence (TPAMI)
