#!/bin/bash

echo "========================================="
echo "   Afya Quest Application Status Check   "
echo "========================================="
echo ""

# Check Frontend
echo "📱 Frontend Status:"
if curl -s http://localhost:3000 > /dev/null 2>&1; then
    echo "   ✅ Running on http://localhost:3000"
else
    echo "   ❌ Not running"
fi

echo ""

# Check Backend
echo "⚙️  Backend API Status:"
if curl -s http://localhost:5001/api/health > /dev/null 2>&1; then
    HEALTH=$(curl -s http://localhost:5001/api/health)
    echo "   ✅ Running on http://localhost:5001"
    echo "   Health: $HEALTH"
else
    echo "   ❌ Not running"
fi

echo ""
echo "========================================="
echo ""
echo "📝 Quick Access:"
echo "   Frontend: http://localhost:3000"
echo "   Backend API: http://localhost:5001/api/health"
echo ""
echo "Demo Credentials:"
echo "   Email: demo@afyaquest.com"
echo "   Password: demo123"
echo ""
echo "========================================="